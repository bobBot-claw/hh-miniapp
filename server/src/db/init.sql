-- HH小程序 数据库初始化脚本 v2.0
-- 在 Supabase SQL Editor 中执行
-- 定位: 运动为主的身体健康行动引导应用

-- ===== 启用扩展 =====
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ===== 用户表 =====
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  openid        VARCHAR UNIQUE NOT NULL,
  nickname      VARCHAR,
  avatar_url    VARCHAR,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- ===== 用户画像表 =====
CREATE TABLE IF NOT EXISTS user_profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  problem_tags      JSONB DEFAULT '[]'::jsonb,        -- 身体问题标签 ["肩颈痛","久坐","体态差"]
  duration_pref     VARCHAR DEFAULT '5min',            -- 运动时长偏好 '1-3min'/'5min'/'10min'
  exercise_habit    VARCHAR DEFAULT 'sedentary',       -- 运动习惯 'sedentary'/'occasional'/'active'
  feature_weights   JSONB DEFAULT '{"exercise":0.7,"knowledge":0.15,"meditation":0.15}'::jsonb,
  usage_pattern     VARCHAR DEFAULT 'random',          -- morning/evening/random
  persistence_score INTEGER DEFAULT 0,
  last_active_at    TIMESTAMP,                         -- 最近活跃时间（计算久坐用）
  total_sedentary_min INTEGER DEFAULT 0,               -- 今日久坐分钟数
  behavior_vector   vector(128),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- ===== 能力值表 =====
CREATE TABLE IF NOT EXISTS user_stats (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  posture_score     INTEGER DEFAULT 0,                 -- 🦴 体态健康 0-100
  core_score        INTEGER DEFAULT 0,                 -- 💪 核心稳定 0-100
  flexibility_score INTEGER DEFAULT 0,                 -- 🧘 柔韧性 0-100
  vitality_score    INTEGER DEFAULT 0,                 -- ⚡ 活力值 0-100
  mind_body_score   INTEGER DEFAULT 0,                 -- 🧠 身心平衡 0-100
  total_exercise_min INTEGER DEFAULT 0,                -- 总运动分钟数
  streak_days       INTEGER DEFAULT 0,                 -- 连续天数
  last_exercise_at  TIMESTAMP,                         -- 上次运动时间
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- ===== 行为日志表 =====
CREATE TABLE IF NOT EXISTS behavior_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type    VARCHAR NOT NULL,                      -- exercise_complete, knowledge_read, meditation_complete, app_open, skip, ...
  event_data    JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- ===== 运动内容表 =====
CREATE TABLE IF NOT EXISTS exercises (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR NOT NULL,
  subtitle        VARCHAR,
  description     TEXT,
  category        VARCHAR NOT NULL,                    -- micro/first_aid/posture/energy/stress/core/flexibility/sleep
  target_body     JSONB DEFAULT '[]'::jsonb,           -- 目标部位 ["肩颈","腰背"]
  problem_tags    JSONB DEFAULT '[]'::jsonb,           -- 解决问题 ["久坐","体态","脑雾"]
  difficulty      VARCHAR DEFAULT 'beginner',           -- zero/entry/beginner/intermediate
  duration        INTEGER DEFAULT 0,                    -- 秒
  scene           JSONB DEFAULT '[]'::jsonb,            -- 场景 ["晨起","工作间隙","睡前","随时"]
  position_type   VARCHAR DEFAULT 'any',                -- sit/stand/floor/any
  video_url       VARCHAR,
  thumbnail_url   VARCHAR,
  cover_gradient  VARCHAR,
  emoji           VARCHAR,
  calorie         INTEGER DEFAULT 0,
  is_static       BOOLEAN DEFAULT true,
  play_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ===== 健康知识表 =====
CREATE TABLE IF NOT EXISTS knowledge (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR NOT NULL,
  content         TEXT,
  category        VARCHAR DEFAULT 'tip',               -- science/tip/myth
  problem_tags    JSONB DEFAULT '[]'::jsonb,
  related_exercises JSONB DEFAULT '[]'::jsonb,
  read_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ===== 冥想内容表 =====
CREATE TABLE IF NOT EXISTS meditations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR NOT NULL,
  subtitle        VARCHAR,
  description     TEXT,
  category        VARCHAR DEFAULT 'breath',             -- breath/body_scan/mindfulness/dynamic
  difficulty      VARCHAR DEFAULT 'beginner',
  duration        INTEGER DEFAULT 0,
  scene           JSONB DEFAULT '[]'::jsonb,
  audio_url       VARCHAR,
  cover_gradient  VARCHAR,
  emoji           VARCHAR,
  is_static       BOOLEAN DEFAULT true,
  play_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ===== 成就表 =====
CREATE TABLE IF NOT EXISTS achievements (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type VARCHAR NOT NULL,                    -- streak/total_min/category_first/level_up/milestone
  achievement_data JSONB DEFAULT '{}'::jsonb,
  unlocked_at     TIMESTAMP DEFAULT NOW()
);

-- ===== 推荐缓存表 =====
CREATE TABLE IF NOT EXISTS recommendations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  content_ids   JSONB DEFAULT '[]'::jsonb,
  reason        JSONB DEFAULT '{}'::jsonb,
  expires_at    TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- ===== 索引 =====
CREATE INDEX IF NOT EXISTS idx_users_openid ON users(openid);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON behavior_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_event_type ON behavior_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON behavior_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_exercises_category ON exercises(category);
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX IF NOT EXISTS idx_exercises_target_body ON exercises USING gin(target_body);
CREATE INDEX IF NOT EXISTS idx_exercises_problem_tags ON exercises USING gin(problem_tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge(category);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_type ON achievements(achievement_type);

-- ===== 种子数据：运动内容 =====
INSERT INTO exercises (id, title, subtitle, emoji, cover_gradient, category, target_body, problem_tags, difficulty, duration, scene, position_type, play_count) VALUES

-- ⚡ 微行动
('ex_micro_01', '站起来活动一下', '只要1分钟，比不动强100倍', '⚡', 'linear-gradient(135deg, #fdcb6e, #f39c12)', 'micro', '["全身"]', '["久坐"]', 'zero', 60, '["工作间隙","随时"]', 'stand', 2341),
('ex_micro_02', '转转脖子', '缓解颈部僵硬', '🔄', 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', 'micro', '["肩颈"]', '["肩颈痛"]', 'zero', 60, '["工作间隙","随时"]', 'sit', 1876),
('ex_micro_03', '伸个懒腰', '全身舒展', '🤸', 'linear-gradient(135deg, #55efc4, #00b894)', 'micro', '["全身"]', '["久坐"]', 'zero', 30, '["工作间隙","随时"]', 'stand', 1567),
('ex_micro_04', '抖抖手和手腕', '放松手指和手腕', '👋', 'linear-gradient(135deg, #a29bfe, #6c5ce7)', 'micro', '["手腕"]', '["久坐"]', 'zero', 60, '["工作间隙","随时"]', 'sit', 923),
('ex_micro_05', '深呼吸3次', '1分钟呼吸重置', '🫁', 'linear-gradient(135deg, #74b9ff, #0984e3)', 'micro', '["全身"]', '["压力","脑雾"]', 'zero', 60, '["随时"]', 'any', 1234),
('ex_micro_06', '眼睛转动操', '缓解眼疲劳', '👀', 'linear-gradient(135deg, #81ecec, #00cec9)', 'micro', '["眼睛"]', '["眼疲劳"]', 'zero', 60, '["工作间隙","随时"]', 'sit', 876),

-- 🆘 久坐急救
('ex_aid_01', '肩颈拉伸4步', '3分钟缓解肩颈僵硬', '🆘', 'linear-gradient(135deg, #ff7675, #d63031)', 'first_aid', '["肩颈","颈部"]', '["肩颈痛","久坐"]', 'entry', 180, '["工作间隙"]', 'sit', 3456),
('ex_aid_02', '腰背放松3式', '久坐腰痛快速缓解', '🆘', 'linear-gradient(135deg, #e17055, #d63031)', 'first_aid', '["腰背"]', '["久坐","腰背不适"]', 'entry', 180, '["工作间隙"]', 'sit', 2789),
('ex_aid_03', '手腕手指放松', '打字族的救星', '🆘', 'linear-gradient(135deg, #fab1a0, #e17055)', 'first_aid', '["手腕"]', '["久坐"]', 'entry', 180, '["工作间隙"]', 'sit', 1234),
('ex_aid_04', '眼睛放松操', '屏幕党的护眼操', '🆘', 'linear-gradient(135deg, #81ecec, #00cec9)', 'first_aid', '["眼睛"]', '["眼疲劳"]', 'entry', 180, '["工作间隙"]', 'sit', 1567),
('ex_aid_05', '全身快速唤醒', '坐久了动一下全身', '🆘', 'linear-gradient(135deg, #fdcb6e, #e17055)', 'first_aid', '["全身"]', '["久坐","脑雾"]', 'entry', 300, '["工作间隙","午休"]', 'stand', 2134),

-- 🧍 体态改善
('ex_posture_01', '圆肩矫正跟练', '打开胸腔，改善圆肩', '🧍', 'linear-gradient(135deg, #7c6ff7, #9d93fa)', 'posture', '["肩颈","胸部"]', '["体态差","圆肩"]', 'beginner', 300, '["晨起","工作间隙"]', 'stand', 1987),
('ex_posture_02', '驼背改善跟练', '挺起来，告别驼背', '🧍', 'linear-gradient(135deg, #5b4fd4, #7c6ff7)', 'posture', '["背部","肩颈"]', '["体态差","驼背"]', 'beginner', 420, '["晨起","工作间隙"]', 'stand', 1678),
('ex_posture_03', '脖子前倾矫正', '找回你的天鹅颈', '🧍', 'linear-gradient(135deg, #9d93fa, #b8b0ff)', 'posture', '["肩颈","颈部"]', '["体态差","脖子前倾"]', 'beginner', 300, '["晨起","工作间隙"]', 'stand', 1456),
('ex_posture_04', '骨盆前倾改善', '纠正骨盆，保护腰椎', '🧍', 'linear-gradient(135deg, #6c5ce7, #a29bfe)', 'posture', '["腰背","髋部"]', '["体态差","腰背不适"]', 'beginner', 420, '["晨起","午休"]', 'floor', 1123),

-- ☀️ 活力唤醒
('ex_energy_01', '晨间唤醒操', '用运动开启新的一天', '☀️', 'linear-gradient(135deg, #ffeaa7, #f39c12)', 'energy', '["全身"]', '["脑雾","久坐"]', 'entry', 180, '["晨起"]', 'stand', 2567),
('ex_energy_02', '办公室活力操', '下午犯困？动起来', '☀️', 'linear-gradient(135deg, #f39c12, #e17055)', 'energy', '["全身"]', '["脑雾","久坐"]', 'entry', 300, '["午休","工作间隙"]', 'stand', 1890),
('ex_energy_03', '午后提神操', '赶走午后的困倦', '☀️', 'linear-gradient(135deg, #fdcb6e, #f39c12)', 'energy', '["全身"]', '["脑雾"]', 'entry', 180, '["午休"]', 'stand', 1234),

-- 😌 压力释放
('ex_stress_01', '拍打放松', '拍走身体里的紧张', '😌', 'linear-gradient(135deg, #a29bfe, #6c5ce7)', 'stress', '["全身"]', '["压力"]', 'entry', 180, '["工作间隙","睡前"]', 'stand', 1678),
('ex_stress_02', '抖动放松', '像狗甩水一样放松', '😌', 'linear-gradient(135deg, #fd79a8, #e84393)', 'stress', '["全身"]', '["压力"]', 'entry', 180, '["工作间隙","睡前"]', 'stand', 1234),
('ex_stress_03', '释放紧张运动', '给身体一个释放的出口', '😌', 'linear-gradient(135deg, #e84393, #d63031)', 'stress', '["全身"]', '["压力","脑雾"]', 'entry', 300, '["工作间隙","睡前"]', 'stand', 987),

-- 💪 核心稳定
('ex_core_01', '核心激活', '唤醒沉睡的核心肌群', '💪', 'linear-gradient(135deg, #00b894, #55efc4)', 'core', '["核心","腰腹"]', '["体态差","腰背不适"]', 'beginner', 300, '["晨起","午休"]', 'floor', 1456),
('ex_core_02', '腰腹力量入门', '从零开始练核心', '💪', 'linear-gradient(135deg, #00cec9, #81ecec)', 'core', '["核心","腰腹"]', '["体态差"]', 'beginner', 420, '["晨起","午休"]', 'floor', 1123),
('ex_core_03', '死虫鸟狗式跟练', '最安全的核心训练', '💪', 'linear-gradient(135deg, #55efc4, #00b894)', 'core', '["核心","腰背"]', '["腰背不适","体态差"]', 'beginner', 300, '["晨起","午休"]', 'floor', 876),

-- 🧘 柔韧性
('ex_flex_01', '全身拉伸', '从头到脚的拉伸', '🧘', 'linear-gradient(135deg, #74b9ff, #0984e3)', 'flexibility', '["全身"]', '["久坐","柔韧差"]', 'beginner', 420, '["晨起","睡前"]', 'floor', 1890),
('ex_flex_02', '髋部打开', '久坐族的髋部释放', '🧘', 'linear-gradient(135deg, #0984e3, #6c5ce7)', 'flexibility', '["髋部"]', '["久坐"]', 'beginner', 300, '["晨起","睡前"]', 'floor', 1234),
('ex_flex_03', '肩胸打开', '释放肩胸的紧张', '🧘', 'linear-gradient(135deg, #6c5ce7, #a29bfe)', 'flexibility', '["肩颈","胸部"]', '["肩颈痛","体态差"]', 'beginner', 300, '["晨起","睡前"]', 'floor', 1067),

-- 🌙 睡前放松
('ex_sleep_01', '睡前拉伸', '温和拉伸助入睡', '🌙', 'linear-gradient(135deg, #2d2d52, #4a4a8a)', 'sleep', '["全身"]', '["睡眠差"]', 'entry', 300, '["睡前"]', 'floor', 2345),
('ex_sleep_02', '助眠瑜伽', '简单的瑜伽助眠', '🌙', 'linear-gradient(135deg, #1a1a2e, #3d3d6b)', 'sleep', '["全身"]', '["睡眠差","压力"]', 'entry', 420, '["睡前"]', 'floor', 1876),
('ex_sleep_03', '呼吸放松', '用呼吸帮助入睡', '🌙', 'linear-gradient(135deg, #16213e, #0f3460)', 'sleep', '["全身"]', '["睡眠差","压力"]', 'entry', 300, '["睡前"]', 'any', 1567);

-- ===== 种子数据：健康知识 =====
INSERT INTO knowledge (id, title, content, category, problem_tags) VALUES
('know_01', '为什么久坐腰痛？', '久坐时，腰椎承受的压力是站立的1.5倍。腰部肌肉长时间不活动，导致肌肉无力、韧带松弛，椎间盘压力增大，引发腰痛。建议每坐1小时站起来活动3-5分钟。', 'science', '["久坐","腰背不适"]'),
('know_02', '3个动作告别圆肩', '圆肩的根本原因是胸肌过紧+背部肌群过弱。1) 门框拉伸打开胸腔 2) 肩胛骨后缩训练 3) YTWL背部激活。每天5分钟，2周见效。', 'tip', '["体态差","圆肩"]'),
('know_03', '拉伸不是越痛越好', '正确拉伸应该是"有感觉但不疼"。如果感到刺痛或灼烧感，说明拉伸过度了。每次拉伸保持15-30秒，配合深呼吸，让肌肉慢慢放松。', 'myth', '["久坐","体态差"]'),
('know_04', '脖子前倾正在伤害你', '头每前倾2.5cm，颈椎额外承受4-5kg压力。前倾15cm等于脖子上挂了一个7岁小孩！改善方法：下巴微收练习+靠墙站立。', 'science', '["体态差","脖子前倾","肩颈痛"]'),
('know_05', '1分钟运动也有用', '研究表明，即使1分钟的轻度活动，也能改善血糖水平、提升注意力和情绪。比不动强100倍不是夸张，是科学。', 'tip', '["久坐","脑雾"]');

-- ===== 种子数据：冥想内容 =====
INSERT INTO meditations (id, title, subtitle, emoji, cover_gradient, category, difficulty, duration, scene, play_count) VALUES
('med_001', '4-7-8呼吸法', '快速平静神经系统的呼吸技巧', '🫁', 'linear-gradient(135deg, #7c6ff7, #9d93fa)', 'breath', 'beginner', 180, '["工作间隙","睡前"]', 1243),
('med_002', '箱式呼吸', '海豹突击队用的减压呼吸', '🫁', 'linear-gradient(135deg, #5b4fd4, #7c6ff7)', 'breath', 'beginner', 300, '["晨起","工作间隙"]', 876),
('med_003', '腹式呼吸入门', '最基础的放松呼吸', '🫁', 'linear-gradient(135deg, #9d93fa, #b8b0ff)', 'breath', 'entry', 180, '["随时"]', 1567),
('med_004', '运动后身体扫描', '觉察运动后的身体变化', '🧘', 'linear-gradient(135deg, #4ecdc4, #44b09e)', 'body_scan', 'beginner', 300, '["运动后"]', 678),
('med_005', '深度身体扫描', '从头到脚的觉察', '🧘', 'linear-gradient(135deg, #44b09e, #2d8f7f)', 'body_scan', 'intermediate', 600, '["睡前"]', 445),
('med_006', '3分钟正念冥想', '回到当下', '🌿', 'linear-gradient(135deg, #55efc4, #00b894)', 'mindfulness', 'beginner', 180, '["晨起","工作间隙"]', 987),
('med_007', '行走冥想', '把走路变成冥想', '🚶', 'linear-gradient(135deg, #00b894, #00cec9)', 'dynamic', 'beginner', 300, '["晨起"]', 345),
('med_008', '伸展冥想', '冥想和伸展的结合', '🤸', 'linear-gradient(135deg, #74b9ff, #0984e3)', 'dynamic', 'beginner', 300, '["晨起","午休"]', 567);
