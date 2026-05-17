import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Zayura frontend error", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="container-pad flex min-h-screen items-center justify-center">
          <div className="card max-w-xl p-6">
            <h1 className="text-2xl font900">Zayura could not load</h1>
            <p className="mt-3 text-slate-600">
              A browser runtime error occurred. Open DevTools Console for details, or clear site data and reload.
            </p>
            <pre className="mt-4 overflow-auto rounded-lg bg-slate-100 p-3 text-sm text-rose-600">{this.state.error.message}</pre>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
