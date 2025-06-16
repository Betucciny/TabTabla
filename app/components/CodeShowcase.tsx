interface CodeShowcaseProps {
  code: string;
}

export default function CodeShowcase({ code }: CodeShowcaseProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg items-center flex justify-center">
      <pre className="text-white text-4xl leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
