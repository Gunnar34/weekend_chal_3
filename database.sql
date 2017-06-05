CREATE TABLE task_list (
  id SERIAL PRIMARY KEY,
  task_name varchar,
  task_details varchar,
  completed boolean
  );

  INSERT INTO task_list (task_name, task_details, completed)
  Values   ('Fix Roof', 'loose shingles need to be nailed down', 'false');

  INSERT INTO task_list (task_name, task_details, completed)
  Values   ('Mow the Lawn', 'Self Explanatory', 'false');

  INSERT INTO task_list (task_name, task_details, completed)
  Values   ('Study', 'Test in economics', 'false');

   INSERT INTO task_list (task_name, task_details, completed)
  Values   ('Laundry', 'All of your pants are dirty', 'false');

  SELECT * FROM task_list;
