# Tsuzuri 📸

「旅の計画と記録を、ひとつの綴り（タイムライン）に。」

旅行の計画（Plan）と、旅先での思い出写真（Photo）を、1つのタイムライン上に時系列で表示。
友人と同じURLを共有するだけで、リアルタイムに共同編集・閲覧ができるWebアプリケーションです。

## ✨ 機能

- **Googleログイン**: 面倒な登録フローなしで即時利用開始。
- **旅行作成**: タイトルと日程を決めて旅行を作成。
- **タイムライン** (Timeline):
    - **予定 (Plan)**: 時間、タイトル、メモ、地図リンク。
    - **写真 (Photo)**: 思い出の写真をアップロード（ポラロイド風デザイン）。
- **リアルタイム同期** (Supabase Realtime): 友だちの追加・編集が即座に画面に反映。
- **URL共有**: ログイン済みユーザーであれば、URLを知っている全員が編集可能。

## 🛠 技術スタック

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, Realtime)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 ローカル開発環境のセットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/sintaro-katuta/Tabiori-Scrap.git
cd Tabiori-Scrap
npm install
```

### 2. 環境変数の設定
`.env.local` ファイルを作成し、Supabaseのキーを設定します。

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. データベースの準備
SupabaseのSQL Editorで、以下のSQLファイルを実行してください。
- `docs/schema.sql`: テーブルとRLSポリシーの作成
- `docs/enable_realtime.sql`: リアルタイム配信の有効化
- `docs/storage_policy.sql`: 画像アップロード権限の設定

### 4. 起動
```bash
npm run dev
```
`http://localhost:3005` で起動します。

## 📂 ドキュメント
- [要件定義書](docs/要件定義.md)
- [基本設計書](docs/基本設計.md)
- [デプロイ手順書](docs/デプロイ手順書.md)
