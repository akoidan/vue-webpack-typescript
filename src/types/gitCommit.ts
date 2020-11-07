/* eslint @typescript-eslint/naming-convention: 0 */

interface Author {
  name: string;
  email: string;
  date: Date;
}

interface Committer {
  name: string;
  email: string;
  date: Date;
}

interface Tree {
  sha: string;
  url: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature?: unknown;
  payload?: unknown;
}

interface Commit {
  author: Author;
  committer: Committer;
  message: string;
  tree: Tree;
  url: string;
  comment_count: number;
  verification: Verification;
}


interface Parent {
  sha: string;
  url: string;
  html_url: string;
}

interface Stats {
  total: number;
  additions: number;
  deletions: number;
}

interface File {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch: string;
}

interface CommitResponse {
  sha: string;
  node_id: string;
  commit: Commit;
  url: string;
  html_url: string;
  comments_url: string;
  author: Author;
  committer: Committer;
  parents: Parent[];
  stats: Stats;
  files: File[];
}

export {Author, CommitResponse, File, Stats, Parent, Committer, Tree, Verification};

