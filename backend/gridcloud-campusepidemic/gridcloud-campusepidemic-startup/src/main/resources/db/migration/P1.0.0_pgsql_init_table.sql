
create table demo
(
    id               bigserial    not null
        constraint demo_pkey primary key,
    name             varchar(20),
    type             smallint default 0,
    org_code         varchar(100),
    occur_time       timestamp(6),
    create_dept_code varchar(100),
    belong_dept_code varchar(100),
    create_user      varchar(30),
    create_date      timestamp(6) not null,
    update_user      varchar(30),
    update_date      timestamp(6) not null,
    is_delete        smallint default 0
);
-- 注释