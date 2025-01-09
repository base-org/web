export default function GrantApplicationStatusTable({
  applications,
}: {
  applications: string[][];
}) {
  if (applications.length === 0) {
    return <div>You have no applications.</div>;
  }

  return (
    <table className="w-full">
      <thead className="text-left">
        <tr>
          <th>Submission Date</th>
          <th>Nominee Name</th>
          <th>Nominee Project</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="text-left">
        {applications.map((application) => (
          <tr key={application[1]}>
            <td className="border-2 border-white p-2">{application[0]}</td>
            <td className="border-2 border-white p-2">{application[1]}</td>
            <td className="border-2 border-white p-2">{application[5]}</td>
            <td className="border-2 border-white p-2">{application[11]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
