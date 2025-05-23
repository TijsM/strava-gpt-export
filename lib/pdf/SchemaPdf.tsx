import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export const SchemaPdf = () => {
  const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    heading: { fontSize: 20, marginBottom: 10 },
    item: { fontSize: 12 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Invoice Summary</Text>
        </View>
      </Page>
    </Document>
  );
};
