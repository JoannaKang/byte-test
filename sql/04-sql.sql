create or replace function get_user_visit_info(id text, visit_month integer, state_name text)
returns integer
language plpgsql
as
$$
declare event_count integer;
begin
  SELECT count(*) into event_count FROM app_events
  WHERE bot_id = id
  AND event_type = 'VisitState'
  AND extract(month from created_at) = visit_month
  AND event_data::json->>'StateName'=state_name;
  return event_count;
end
$$;

select 
get_user_visit_info('Joanna', 3, 'reorder'), 
get_user_visit_info('Joanna', 3, 'reorder-allergy-info'), 
get_user_visit_info('Joanna', 3, 'reorder-pay');