# 오지선교 도움 연결 (v0.5 · JuYeong 작업본)

접근이 어려운 개신교 선교 현장을 위한 정보 안내 단일 페이지 초안입니다. 현장 준비 분야, 자료실(공식 안내·과거 사례), 공식 창구를 한 페이지에 모았습니다. 서버 없이 브라우저에서만 동작하며, 개인정보를 받지 않습니다.

## 여는 방법
- `index.html`을 브라우저로 바로 열거나
- 이 폴더에서 `python3 -m http.server 8000` 실행 후 http://localhost:8000

## 파일
- `index.html` 페이지 · `styles.css` 스타일 · `app.js` 검색/필터
- `resources.json` 자료 원본 (`data.js`는 같은 내용을 file://에서도 읽히게 담은 사본 — 자료 수정 시 둘 다 갱신)
- `collection.html` 오프라인 자료 목록

앞으로 함께 내용과 디자인을 계속 다듬어 갈 작업본입니다.

## v0.5 (2026.10.27)
- 공식 자료 16건 추가(WHO·CDC·IAMAT·Hesperian·ReliefWeb·GDACS·UK FCDO·ACLED·HDX·Ethnologue·Scripture Earth·Kiwix·DisasterReady·KOICA·INSO 등) → 총 58건
- UX: 분야 칩 건수 표시·선택 칩 자동 스크롤·스크롤 페이드, aria-pressed/selected, 포커스 링, 빈 상태 초기화 버튼, 검색 디바운스, 카드 제목 링크, 모바일 글자·터치 영역 확대, 로딩 문구, reduced-motion
- 상세: REPORT-2026-10-27.md
