import { ActionOptions, Config, emails } from "gadget-server";

export const run: ActionRun = async ({ logger, api }) => {
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  const segmentId = process.env.CUSTOMERIO_SEGMENT_ID;
  const threshold = parseInt(process.env.THRESHOLD ?? "0", 10);
  const alertEmail = process.env.ALERT_EMAIL;

  if (!apiKey || !segmentId) {
    throw new Error("Missing required environment variables: CUSTOMERIO_API_KEY and/or CUSTOMERIO_SEGMENT_ID");
  }

  const url = `https://api.customer.io/v1/segments/${encodeURIComponent(segmentId)}/customer_count`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.status === 404) {
    logger.error({ segmentId }, "Segment not found in Customer.io");
    throw new Error(`Segment ${segmentId} not found in Customer.io`);
  }

  if (response.status === 429) {
    logger.warn({ segmentId }, "Rate limited by Customer.io API");
    throw new Error("Rate limited by Customer.io API, will retry on next scheduled run");
  }

  if (!response.ok) {
    const body = await response.text();
    logger.error({ segmentId, status: response.status, body }, "Customer.io API error");
    throw new Error(`Customer.io API returned ${response.status}: ${body}`);
  }

  const data = await response.json();
  const count = data.count ?? data.customer_count;

  const record = await api.segmentCount.create({
    segmentId,
    count,
    fetchedAt: new Date(),
  });

  logger.info({ segmentId, count, recordId: record.id }, "Segment count recorded successfully");

  if (count <= threshold && alertEmail) {
    await emails.sendMail({
      to: alertEmail,
      subject: `[${Config.appName}] Segment count alert: ${count} (threshold: ${threshold})`,
      html: `<p>The Customer.io segment <strong>${segmentId}</strong> has a customer count of <strong>${count}</strong>, which is at or below the configured threshold of <strong>${threshold}</strong>.</p><p>Checked at: ${new Date().toISOString()}</p>`,
    });
    logger.info({ segmentId, count, threshold, alertEmail }, "Alert email sent");
  }
};

export const options: ActionOptions = {
  triggers: {
    scheduler: [{ cron: "0 0 * * *" }],
  },
};
