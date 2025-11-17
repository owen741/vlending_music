interface ProcessStep {
  title: string;
  items: string[];
}

interface ProcessFlowProps {
  steps: ProcessStep[];
}

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-4">2. 유통 프로세스 (위덴 수정 가능)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            <div className="border-2 border-gray-800 bg-white p-6 h-full">
              <h3 className="mb-3">{step.title}</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ol>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                <div className="w-4 h-0.5 bg-gray-800"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
