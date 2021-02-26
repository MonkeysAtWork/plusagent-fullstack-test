const sql = {
  getTodos: 'SELECT * FROM todos ORDER BY date;',
  insertTodo: 'INSERT INTO todos (description, date) VALUES (?,?);',
  createTodosTable: `CREATE TABLE IF NOT EXISTS todos (
                      id INTEGER PRIMARY KEY,
                      description TEXT NOT NULL,
                      date TEXT NOT NULL
                    );`
};

export default sql
