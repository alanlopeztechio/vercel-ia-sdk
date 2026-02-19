import React, { useTransition } from 'react';

import { createReports } from '@/app/actions';
import { AssistantContent, ToolContent } from 'ai';

const BtnCreateSolution = () => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = React.useState<
    | {
        success: boolean;
        text: string;
        steps: number;
        response: AssistantContent | ToolContent;
        error?: undefined;
      }
    | {
        success: boolean;
        error: string;
        text?: undefined;
        steps?: undefined;
        response?: undefined;
      }
    | null
  >(null);

  return (
    <div className="flex justify-end mr-8">
      <div className="border rounded-xl border-purple-700 bg-purple-800 hover:bg-purple-950 text-purple-200 hover:text-purple-300">
        <button
          className="p-3"
          onClick={() => {
            startTransition(async () => {
              const response = await createReports();
              setResult(response);
            });
          }}
        >
          {isPending ? 'Generando...' : 'Generar Carta'}
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold mb-2 text-black">
            Respuesta Generada:
          </h2>
          <pre className="whitespace-pre-wrap">
            {result.success === true ? (
              <div>{result.text}</div>
            ) : (
              <>
                <div className="text-red-500 font-semibold">
                  Error: {result.error}
                </div>
              </>
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BtnCreateSolution;
