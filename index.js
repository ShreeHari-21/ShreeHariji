
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DBMSPractice() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("Result will be shown here...");

  const executeQuery = async () => {
    try {
      const response = await fetch("https://sql.glot.io/run/mysql/latest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [{ name: "main.sql", content: query }]
        })
      });
      const data = await response.json();
      setOutput(data.stdout || data.stderr || "No output");
    } catch (error) {
      setOutput("Error executing SQL query.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧪 DBMS Lab Practice (MySQL)</h1>

      <ol className="list-decimal list-inside mb-6 text-sm text-gray-700 bg-yellow-50 p-3 rounded-xl">
        <li>👉 Go to <a href="https://github.com" className="text-blue-600 underline" target="_blank">GitHub</a> and sign in.</li>
        <li>➡️ Click on <strong>New Repository</strong>. Name it something like <code>dbms-lab</code>.</li>
        <li>⬆️ Upload the files from this project into the repo.</li>
        <li>🌐 Go to <a href="https://vercel.com" className="text-blue-600 underline" target="_blank">Vercel</a> and sign in with GitHub.</li>
        <li>🚀 Click <strong>"New Project"</strong> → Select the GitHub repo you just created.</li>
        <li>✅ Click <strong>"Deploy"</strong>. Vercel will give you a live URL for your DBMS website.</li>
      </ol>

      <Card className="mb-4">
        <CardContent>
          <Input
            className="mb-2"
            placeholder="Write your SQL query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={executeQuery}>Run Query</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
