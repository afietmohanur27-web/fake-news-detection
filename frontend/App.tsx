import { useState } from "react";
import { NewsInput } from "./components/NewsInput";
import { AnalysisResults } from "./components/AnalysisResults";
import { analyzeNews } from "./utils/analyzer";
import { AnalysisResult } from "./types/analysis";
import { Shield, AlertTriangle } from "lucide-react";

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (text: string, url?: string) => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const analysisResult = analyzeNews(
      text || `Sample article from ${url}`,
      url,
    );
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Newspaper background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${newspaperBg})` }}
      ></div>

      {/* Light overlay for better readability */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="max-w-5xl mx-auto relative z-10 bg-gray-100 rounded-lg p-8 shadow-lg border border-black">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold font-[Abhaya_Libre_ExtraBold]">
              Fake News Detector
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-[Abhaya_Libre_ExtraBold]">
            Analyze news articles and headlines for credibility
            indicators, bias, and misinformation patterns
          </p>

          {/* Disclaimer */}
          <div className="mt-6 max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 text-left">
                <strong>Disclaimer:</strong> This is an
                educational tool using pattern-based analysis.
                Always verify information through multiple
                credible sources and professional fact-checking
                organizations.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <NewsInput
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {/* Results */}
        {result && <AnalysisResults result={result} />}
      </div>
    </div>
  );
}
