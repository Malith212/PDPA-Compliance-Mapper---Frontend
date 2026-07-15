const API_BASE = "http://localhost:8000";

export async function analyzePolicy(policyText) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policy_text: policyText }),
  });

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  return response.json();
}

const TRANSLATOR_API_BASE = "http://localhost:8001";

export async function translateText(text) {
  const response = await fetch(`${TRANSLATOR_API_BASE}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.detail || `Translator backend returned ${response.status}`);
  }

  return response.json();
}

export async function translateDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${TRANSLATOR_API_BASE}/translate-document`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.detail || `Translator backend returned ${response.status}`);
  }

  return response.json();
}