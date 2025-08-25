// logging-middleware/logger.js
export async function Log(stack, level, pkg, message) {
  const payload = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch("http://20.244.56.144/logging-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Failed to send log. Status: ${res.status}`);
  } catch {
    try {
      const failed = JSON.parse(localStorage.getItem("__log_fail__") || "[]");
      failed.push(payload);
      localStorage.setItem("__log_fail__", JSON.stringify(failed));
    } catch {/* ignore */}
  }
}
