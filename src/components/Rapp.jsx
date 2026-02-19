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
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #111827, #1f2937)",
      padding: 20,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "#0f172a",
        padding: 25,
        borderRadius: 16,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        fontFamily: "Arial",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: "white",
        }}
      >
        Rapi Calculator ⚡
      </h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          onClick={() => setMode("somme")}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: 0,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
            background: mode === "somme" ? "#6366f1" : "#1f2937",
          }}
        >
          Somme
        </button>

        <button
          onClick={() => setMode("produit")}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: 0,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
            background: mode === "produit" ? "#10b981" : "#1f2937",
          }}
        >
          Produit
        </button>
      </div>

      <input
        type="number"
        value={n1}
        onChange={(e) => setN1(e.target.value)}
        placeholder="Premier nombre"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "1px solid #374151",
          marginBottom: 10,
          background: "#020617",
          color: "white",
        }}
      />

      <input
        type="number"
        value={n2}
        onChange={(e) => setN2(e.target.value)}
        placeholder="Deuxième nombre"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "1px solid #374151",
          marginBottom: 15,
          background: "#020617",
          color: "white",
        }}
      />

      <button
        onClick={handleCalculate}
        disabled={loading}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 10,
          border: 0,
          background: "#6366f1",
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? "Calcul..." : "Calculer"}
      </button>

      <div style={{ marginTop: 15, textAlign: "center" }}>
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        {result && (
          <p style={{ color: "#22c55e", fontWeight: "bold" }}>{result}</p>
        )}
      </div>
    </div>
  </div>
);
}