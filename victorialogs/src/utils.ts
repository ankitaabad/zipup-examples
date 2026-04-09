import SenseLogs from "senselogs";
const logger = new SenseLogs();
logger.addFilter(["metric"])
export const Metrics = {
  API_REQUEST: "api_request",
  API_LATENCY: "api_latency",
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAILURE: "login_failure"
} as const;

type MetricName = (typeof Metrics)[keyof typeof Metrics] | (string & {});
function metric(
  name: MetricName,
  tags: Record<string, string | number> = {},
  value = 1
) {
  logger.emit("metric", name, { ...tags, value });
}

metric("api_latency", {method: "GET", path: "/api/test"})