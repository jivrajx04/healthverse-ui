import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

interface State {
  hasError: boolean;
  error: Error | null;
  info: any;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  State
> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: Error, info: any) {
    // Log to console so Metro / device logs include the stack
    console.error('Uncaught error in ErrorBoundary:', error, info);
    this.setState({ info });
  }

  reset = () => this.setState({ hasError: false, error: null, info: null });

  render() {
    if (!this.state.hasError) {
      return this.props.children as React.ReactElement | null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.error}>{String(this.state.error)}</Text>
          {this.state.info && (
            <Text style={styles.info}>{JSON.stringify(this.state.info)}</Text>
          )}
        </ScrollView>
        <Button title="Reload" onPress={this.reset} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  error: { color: 'red', marginBottom: 8 },
  info: { color: '#333' },
  scroll: { maxHeight: 300, width: '100%', marginBottom: 12 },
});
