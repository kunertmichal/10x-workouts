alter table "public"."generations" alter column "id" set default gen_random_uuid();

alter table "public"."profiles" alter column "user_id" set default gen_random_uuid();

alter table "public"."workouts" alter column "id" set default gen_random_uuid();


