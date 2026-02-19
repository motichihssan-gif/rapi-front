import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ TON BACKEND VERCEL
const API_BASE = "https://tp1-node-js.vercel.app";

export default function Rapp() {
  const [n1, setN1] = useState("4");
  const [n2, setN2] = useState("3");
  const [mode, setMode] = useState("somme"); // somme | produit
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trigger) return;

    setLoading(true);
    setError("");
    setResult("");

    axios
      .post(`${API_BASE}/api/v1/calculs/${mode}`, { n1, n2 })
      .then((res) => setResult(res.data.result))
      .catch(() => setError("Erreur lors du calcul"))
      .finally(() => {
        setLoading(false);
        setTrigger(false);
      });
  }, [trigger]);

  const handleCalculate = () => {
    if (n1 === "" || n2 === "") return setError("Saisis n1 et n2");
    setTrigger(true);
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Rapi Calculator</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          onClick={() => setMode("somme")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: 0,
            color: "white",
            background: mode === "somme" ? "#6366f1" : "#111827",
          }}
        >
          Somme
        </button>

        <button
          onClick={() => setMode("produit")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: 0,
            color: "white",
            background: mode === "produit" ? "#10b981" : "#111827",
          }}
        >
          Produit
        </button>
      </div>

      <input
        type="number"
        value={n1}
        onChange={(e) => setN1(e.target.value)}
        placeholder="n1"
        style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 10 }}
      />

      <input
        type="number"
        value={n2}
        onChange={(e) => setN2(e.target.value)}
        placeholder="n2"
        style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 15 }}
      />

      <button
        onClick={handleCalculate}
        disabled={loading}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: 0,
          background: "#6366f1",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {loading ? "Calcul..." : "Calculer"}
      </button>

      <div style={{ marginTop: 15 }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && <p style={{ color: "green" }}>{result}</p>}
      </div>
    </div>
  );
}