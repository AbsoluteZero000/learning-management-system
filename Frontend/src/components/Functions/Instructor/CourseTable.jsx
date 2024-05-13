const CourseTable = ({ courses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Rating</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.name}</td>
            <td>{course.category}</td>
            <td>{course.description}</td>
            <td>{course.rating}</td>
            <td>{course.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
