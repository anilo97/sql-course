/**
 * 공통 Supabase 클라이언트 및 통합 랭킹 관리 서비스
 * 루트의 supabase-config.js (window.APP_CONFIG)를 사용합니다.
 */
window.SqlCourseDB = (function () {
  const TABLE_NAME = 'sql_course_rankings';
  const ADMIN_PIN = '3817';

  function getClient() {
    const url = window.APP_CONFIG?.SUPABASE_URL || '';
    const key = window.APP_CONFIG?.SUPABASE_ANON_KEY || '';
    if (url.startsWith('http') && key && window.supabase) {
      if (!window._sharedSupabaseClient) {
        window._sharedSupabaseClient = window.supabase.createClient(url, key);
      }
      return window._sharedSupabaseClient;
    }
    return null;
  }

  function verifyPin(inputPin) {
    return String(inputPin || '').trim() === ADMIN_PIN;
  }

  /**
   * 랭킹 점수 등록
   */
  async function submitScore({ chapterId, nickname, score = 100, totalQuestions = 0, elapsedSec }) {
    const client = getClient();
    if (!client) {
      return { ok: false, error: 'Supabase 설정(supabase-config.js)이 연결되지 않았습니다.' };
    }

    const { error } = await client.from(TABLE_NAME).insert([
      {
        chapter_id: chapterId,
        nickname: nickname,
        score: score,
        total_questions: totalQuestions,
        elapsed_sec: elapsedSec
      }
    ]);

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }

  /**
   * 챕터별 Top N 랭킹 조회
   * sortBy: 'time' (최단 시간순) | 'score' (최고 점수순 -> 최단 시간순)
   */
  async function fetchLeaderboard({ chapterId, limit = 10, sortBy = 'time' }) {
    const client = getClient();
    if (!client) {
      return { ok: false, noConfig: true, data: [] };
    }

    let query = client
      .from(TABLE_NAME)
      .select('nickname, score, total_questions, elapsed_sec')
      .eq('chapter_id', chapterId);

    if (sortBy === 'score') {
      query = query.order('score', { ascending: false }).order('elapsed_sec', { ascending: true });
    } else {
      query = query.order('elapsed_sec', { ascending: true });
    }

    const { data, error } = await query.limit(limit);
    if (error) {
      return { ok: false, error: error.message, data: [] };
    }
    return { ok: true, data: data || [] };
  }

  /**
   * [이스터에그 관리자 기능] 특정 챕터 랭킹 초기화 (DELETE)
   */
  async function resetChapterRanking(chapterId, pin) {
    if (!verifyPin(pin)) {
      return { ok: false, error: '비밀번호가 일치하지 않습니다.' };
    }

    const client = getClient();
    if (!client) {
      return { ok: false, error: '루트 폴더의 supabase-config.js 파일이 연결되지 않았습니다.' };
    }

    const { error } = await client
      .from(TABLE_NAME)
      .delete()
      .eq('chapter_id', chapterId);

    if (error) {
      return { ok: false, error: '초기화 실패: ' + error.message };
    }
    return { ok: true };
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    submitScore,
    fetchLeaderboard,
    resetChapterRanking,
    escapeHtml
  };
})();
