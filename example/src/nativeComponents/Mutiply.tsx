import * as React from 'react';
import { Text } from 'react-native';
import { multiply } from 'appboss-custom-code';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return <Text>{result}</Text>;
}
