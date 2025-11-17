interface Reference {
  category: string;
  links: string[];
}

interface ReferenceTableProps {
  references: Reference[];
}

export function ReferenceTable({ references }: ReferenceTableProps) {
  return (
    <div className="border border-gray-800 bg-white overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="bg-black text-white p-3 text-left w-1/3">카테고리</th>
            <th className="bg-black text-white p-3 text-left">URL</th>
          </tr>
        </thead>
        <tbody>
          {references.map((ref, idx) => (
            <tr key={idx} className="border-b border-gray-800 last:border-b-0">
              <td className="p-4 align-top border-r border-gray-800">
                {ref.category}
              </td>
              <td className="p-4">
                <ol className="list-decimal list-inside space-y-1">
                  {ref.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="break-all">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ol>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
