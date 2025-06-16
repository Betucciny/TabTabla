interface CodeShowcaseProps {
  code: string;
}

export default function CodeShowcase({ code }: CodeShowcaseProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg items-center flex justify-center z-50">
      <pre className="text-white text-3xl leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
