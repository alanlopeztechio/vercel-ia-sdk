import { Doc } from "../../convex/_generated/dataModel";

interface AbsentTableProps {
  users: Doc<"users">[]; // Ejemplo de prop para recibir datos de usuario
}

const UserTable = ({ users }: AbsentTableProps) => {
  return (
    <div className="flex flex-col p-5 m-3">
      <table>
        <thead>
          <tr className="">
            <th className="border-b border-gray-400 p-3">Email</th>
            <th className="border-b border-gray-400 p-3">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.name}
                </td>
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.email}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
