
-- Remove named founder references, make all predictions generic/anonymous
UPDATE predictions SET founder_name = 'Revenue Milestone', founder_photo_url = NULL WHERE slug = 'pieter-levels-100m';
UPDATE predictions SET question = 'Will a top indie hacker''s combined revenue exceed $100M ARR by Dec 31, 2027?' WHERE slug = 'pieter-levels-100m';

UPDATE predictions SET founder_name = 'Revenue Milestone', founder_photo_url = NULL WHERE slug = 'tony-dinh-10m';
UPDATE predictions SET question = 'Will a SaaS solo founder reach $10M ARR by Dec 31, 2027?' WHERE slug = 'tony-dinh-10m';

UPDATE predictions SET founder_name = 'Ship Fast', founder_photo_url = NULL WHERE slug = 'marc-lou-5m';
UPDATE predictions SET question = 'Will a "ship fast" solo founder exceed $5M ARR by Dec 31, 2026?' WHERE slug = 'marc-lou-5m';

UPDATE predictions SET founder_name = 'Portfolio Play', founder_photo_url = NULL WHERE slug = 'daniel-vassallo-5m';
UPDATE predictions SET question = 'Will a "small bets" portfolio strategy exceed $5M ARR by Dec 31, 2027?' WHERE slug = 'daniel-vassallo-5m';

UPDATE predictions SET founder_name = 'Solopreneur Empire', founder_photo_url = NULL WHERE slug = 'justin-welsh-10m';
UPDATE predictions SET question = 'Will a one-person media empire exceed $10M annual revenue by Dec 31, 2027?' WHERE slug = 'justin-welsh-10m';

UPDATE predictions SET founder_name = 'SaaS Growth', founder_photo_url = NULL WHERE slug = 'damon-chen-testimonial-10m';
UPDATE predictions SET question = 'Will a bootstrapped SaaS tool reach $10M ARR by Dec 31, 2027?' WHERE slug = 'damon-chen-testimonial-10m';

UPDATE predictions SET founder_name = 'Ben Tossell', founder_photo_url = NULL WHERE slug = 'ben-tossell-10m';
UPDATE predictions SET question = 'Will a newsletter-turned-business exceed $10M ARR by Dec 31, 2028?', founder_name = 'Newsletter Empire' WHERE slug = 'ben-tossell-10m';

UPDATE predictions SET founder_name = 'YC Startup', founder_photo_url = NULL WHERE slug = 'sean-dorje-naive-1b';
UPDATE predictions SET question = 'Will a YC-backed AI startup reach $1B valuation by Dec 31, 2029?' WHERE slug = 'sean-dorje-naive-1b';

UPDATE predictions SET company_name = 'Any Solo Founder', description = 'Can a top indie hacker cross $100M in combined recurring revenue?' WHERE slug = 'pieter-levels-100m';
UPDATE predictions SET company_name = 'SaaS Solo Founder', description = 'Can a solo SaaS builder reach the $10M ARR milestone?' WHERE slug = 'tony-dinh-10m';
UPDATE predictions SET company_name = 'Speed Builder', description = 'Known for rapid launches — can the "ship fast" strategy hit $5M ARR?' WHERE slug = 'marc-lou-5m';
UPDATE predictions SET company_name = 'Portfolio Strategy', description = 'Can the small bets portfolio approach compound to $5M ARR?' WHERE slug = 'daniel-vassallo-5m';
UPDATE predictions SET company_name = 'Solo Media', description = 'Can a one-person content and course empire cross $10M?' WHERE slug = 'justin-welsh-10m';
UPDATE predictions SET company_name = 'Bootstrapped SaaS', description = 'Can a bootstrapped testimonial/review tool reach $10M ARR?' WHERE slug = 'damon-chen-testimonial-10m';
UPDATE predictions SET company_name = 'Newsletter Business', description = 'Can an AI newsletter empire cross $10M ARR?' WHERE slug = 'ben-tossell-10m';
UPDATE predictions SET company_name = 'AI Startup (YC)', description = 'Can a YC-backed AI company building autonomous agents reach unicorn status?' WHERE slug = 'sean-dorje-naive-1b';

-- Also fix the $100M ARR Race one that still references Pieter Levels
UPDATE predictions SET founder_name = 'The $100M Pioneer', founder_photo_url = NULL, question = 'Will the leading indie hacker be the first solo founder to $100M ARR?', company_name = 'Top Indie Hacker', description = 'Already the highest-earning indie hacker — can they be first to the $100M mark?' WHERE slug = '100m-arr-pieter-levels';
