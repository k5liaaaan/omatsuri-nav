このリポジトリは、一般ユーザー向けの「お祭り情報サイト（omatsuri-nav）」のフロントエンドです。Next.js（App Router + TypeScript + Tailwind）で構築されています。

## 現在の状況（MVP）

- ページ構成（3階層ナビゲーション）
  - `/` 都道府県一覧（TOP）
  - `/prefectures/[id]/municipalities` 市区町村一覧
  - `/prefectures/[id]/municipalities/[municipalityId]/festivals` 地域別お祭り一覧
  - `/festivals/[id]` お祭り詳細

- データ取得（バックエンド連携）
  - 既定のバックエンドURLは `http://localhost:3001`
  - フロントは公開APIを参照します（管理側の認証不要）

- 公開API（管理リポ `C:\omatsuri-admin\backend` で提供）
  - `GET /api/public/festivals`
    - クエリ: `prefectureId`, `municipalityId`, `month (YYYY-MM)`, `orderBy (nearest|newest)`, `page`, `limit`
  - `GET /api/public/festivals/:id`
  - 参考（地域マスタ）: `GET /api/region/prefectures`, `GET /api/region/prefectures/:prefectureId/municipalities`

## セットアップ

1. 依存関係インストール

```bash
npm install
```

2. 環境変数（任意）

`NEXT_PUBLIC_API_BASE_URL` を設定しない場合は `http://localhost:3001` を使用します。

例（ローカル用）: `.env.local`

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## 開発サーバの起動

フロントエンド（本リポジトリ）:

```bash
npm run dev
# http://localhost:3000 でアクセス
```

バックエンド（管理リポ）:

```bash
cd C:\omatsuri-admin\backend
npm install
node src/index.js
# http://localhost:3001 で起動
```

## 動作確認の手順

1. バックエンドが起動していることを確認
   - `http://localhost:3001/api/public/festivals` でJSONが返る
2. フロントエンドを起動
   - `http://localhost:3000/festivals` で一覧が表示
   - `http://localhost:3000/festivals/1` などで詳細が表示（データがあるID）

## ディレクトリ構成（抜粋）

- `app/`
  - `page.tsx` ホーム
  - `festivals/page.tsx` 一覧
  - `festivals/[id]/page.tsx` 詳細
- `lib/api.ts` 公開APIクライアント

## 今後の予定（Next）

- 一覧の検索UI（都道府県/市区町村/開催月）
- SEO/OGP（構造化データ Event の追加）
- お気に入り（匿名保存）

## 参考

- Next.js: https://nextjs.org
- Tailwind CSS: https://tailwindcss.com
