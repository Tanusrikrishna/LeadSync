import { StyleSheet } from "react-native";

const leadStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  connectionStatus: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  connected: {
    backgroundColor: "#dcfce7",
  },

  disconnected: {
    backgroundColor: "#fee2e2",
  },

  connectionText: {
    fontSize: 13,
    fontWeight: "600",
  },

  list: {
    padding: 16,
  },

  leadCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  leadTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  field: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 8,
  },

  fieldName: {
    fontWeight: "700",
  },

  fieldValue: {
    fontWeight: "400",
  },

  leadId: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },
});

export default leadStyles;