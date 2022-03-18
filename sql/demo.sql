-- 使用 select 从表中查询数据
-- select * from users;

-- 使用 insert into 添加数据
-- insert into users (username, password) values ('tony start', '098123');

-- 使用 update 修改数据
-- update users set password='admin123', status=1 where username='tony start';

-- 使用 delete 删除数据
-- delete from users where id=4;

-- 使用 order by 进行排序，asc 升序 默认，desc 降序
-- select * from users order by id desc;

-- 使用 where 添加条件，使用 and 或 or 添加多个条件
-- update users set status=1 where username='ls' and status=0;

-- 使用 count(*) 统计数量，使用 as 给列起别名
-- select count(*) as total from users where status=1