# 디지털 재활·헬스케어 AI 개발자 양성 과정 — 데이터베이스 & SQL 실습 허브

**《혼자 공부하는 SQL with AI》** 강의 진도에 맞춰, 디지털 재활 및 헬스케어 도메인 데이터를 직접 설계하고 쿼리해 볼 수 있도록 제작된 웹 기반 인터랙티브 실습 워크시트 모음입니다.

## 📁 저장소 폴더 구조

```text
├── index.html                      # 전체 실습 목차 허브 페이지 (메인 진입점)
├── ch02-db-modeling/
│   └── index.html                  # [Ch 02] AI 홈 재활 서비스 데이터베이스 모델링 워크시트
├── ch03-select-practice/           # [Ch 03] 기본 SQL 문법 (SELECT ~ FROM ~ WHERE) 실습 (예정)
├── ch04-join-practice/             # [Ch 04] 고급 SQL 문법 (데이터 형식, JOIN) 실습 (예정)
└── ch05-table-constraints/         # [Ch 05] 테이블과 제약조건 (PK/FK, DDL 구축) 실습 (예정)
```

## 🚀 GitHub Pages 배포 및 새 실습 추가 방법

1. 저장소의 **Settings → Pages** 메뉴에서 `Source`를 `Deploy from a branch`로, `Branch`를 `main`(`/root`)으로 설정합니다.
2. 추후 새로운 챕터의 실습 파일을 추가할 때는 해당 챕터 폴더(예: `ch03-select-practice/index.html`)를 생성해 업로드한 뒤, 최상단 `index.html`의 주석 가이드를 참고해 카드를 활성화합니다.