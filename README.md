# Omatsuri Nav

お祭り情報サイト - 一般ユーザー向けフロントエンド

## 📋 プロジェクト概要

Omatsuri Navは、一般ユーザー向けのお祭り情報を閲覧するためのWebアプリケーションです。Next.js（App Router + TypeScript + Tailwind CSS）で構築されています。

### 主な機能

- 都道府県一覧表示
- 市区町村一覧表示
- 地域別お祭り一覧表示
- お祭り詳細表示
- 公開API経由でのデータ取得（認証不要）

### 技術スタック

- **フロントエンド**: Next.js 15（App Router）+ TypeScript + Tailwind CSS 4
- **ランタイム**: React 19
- **開発ツール**: Turbopack

## 📁 プロジェクト構造

```
omatsuri-nav/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # ホーム（都道府県一覧）
│   ├── layout.tsx               # ルートレイアウト
│   ├── loading.tsx              # グローバルローディング
│   ├── globals.css              # グローバルスタイル
│   ├── festivals/               # お祭り関連ページ
│   │   ├── page.tsx            # お祭り一覧
│   │   ├── loading.tsx         # ローディング状態
│   │   └── [id]/               # 動的ルート
│   │       ├── page.tsx        # お祭り詳細
│   │       └── loading.tsx     # ローディング状態
│   └── prefectures/             # 都道府県関連ページ
│       └── [id]/
│           └── municipalities/  # 市区町村関連ページ
│               ├── page.tsx     # 市区町村一覧
│               ├── loading.tsx  # ローディング状態
│               └── [municipalityId]/
│                   └── festivals/
│                       ├── page.tsx    # 地域別お祭り一覧
│                       └── loading.tsx # ローディング状態
├── components/                   # Reactコンポーネント
│   ├── BackButton.tsx          # 戻るボタン
│   ├── Footer.tsx              # フッター
│   └── LoadingState.tsx        # ローディング状態コンポーネント
├── lib/                         # ユーティリティ
│   └── api.ts                  # 公開APIクライアント
├── public/                      # 静的ファイル
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 クイックスタート

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定（任意）

`NEXT_PUBLIC_API_BASE_URL` を設定しない場合は、デフォルトで `http://localhost:3001` を使用します。

例（ローカル用）: `.env.local`

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 3. バックエンドの起動

バックエンド（管理リポジトリ）を起動してください：

```bash
cd C:\omatsuri-admin\backend
npm install
node src/index.js
# http://localhost:3001 で起動
```

### 4. 開発サーバーの起動

```bash
npm run dev
# http://localhost:3000 でアクセス
```

### 5. アクセス確認

- **フロントエンド**: http://localhost:3000
- **バックエンド**: http://localhost:3001
- **API確認**: http://localhost:3001/api/public/festivals

## 📡 API仕様

本アプリケーションは、管理リポジトリ（`C:\omatsuri-admin\backend`）で提供される公開APIを使用します。

### 公開APIエンドポイント

- `GET /api/public/festivals`
  - クエリパラメータ:
    - `prefectureId`: 都道府県ID（オプション）
    - `municipalityId`: 市区町村ID（オプション）
    - `month`: 開催月（YYYY-MM形式、オプション）
    - `orderBy`: ソート順（`nearest` | `newest`、オプション）
    - `page`: ページ番号（オプション）
    - `limit`: 1ページあたりの件数（オプション）

- `GET /api/public/festivals/:id`
  - お祭り詳細情報を取得

### 参考（地域マスタ）

- `GET /api/region/prefectures`
  - 都道府県一覧を取得

- `GET /api/region/prefectures/:prefectureId/municipalities`
  - 指定都道府県の市区町村一覧を取得

## 📄 ページ構成

- `/` - 都道府県一覧（TOP）
- `/prefectures/[id]/municipalities` - 市区町村一覧
- `/prefectures/[id]/municipalities/[municipalityId]/festivals` - 地域別お祭り一覧
- `/festivals/[id]` - お祭り詳細

## 📝 今後の実装予定

- [ ] 一覧の検索UI（都道府県/市区町村/開催月）
- [ ] SEO/OGP（構造化データ Event の追加）
- [ ] お気に入り機能（匿名保存）

## 📚 参考リンク

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)