-- Create function that will modify 'updated at' timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new table
CREATE TABLE fb_profile (
  user_id serial PRIMARY KEY,
  PSID text not null,
  first_name text not null,
  last_name text not null,
  profile_pic text,
  locale text not null,
  timezone smallint not null,
  gender text not null,
  last_ad_referral jsonb not null,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- Set trigger so that editing row will cause 'trigger_set_timestamp()'
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON fb_profile
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


-- Test: add new data --
INSERT INTO fb_profile (
  PSID,
  first_name,
  last_name,
  profile_pic,
  locale,
  timezone,
  gender,
  last_ad_referral)
VALUES (
  'asdasdfasdf',
  'Joanna', 
  'Kang', 
  'https://example.com/13055603_10105219398495383_8237637584159975445_n.jpg',
  'en_UK',
  -7,
  'female',
  '{
      "source": "ADS",
      "type": "OPEN_THREAD",
      "ad_id": "6045246247433"
  }'
)

-- Test: update table
UPDATE fb_profile 
SET first_name = 'Sooyeon', last_name= 'Lewin'
WHERE user_id = 1;