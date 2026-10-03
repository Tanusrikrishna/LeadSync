import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

import leadStyles from "../styles/leadStyles";

const SOCKET_URL = "https://squeeze-dress-immunity.ngrok-free.dev";

export default function LeadsScreen() {
  const [leads, setLeads] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      extraHeaders: {"ngrok-skip-browser-warning": "true"},
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    socket.on("connect", () => {
      console.log("Connected to backend:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from backend");
      setConnected(false);
    });

    socket.on("newLead", (lead) => {
      console.log("New lead received:", lead);

      setLeads((previousLeads) => {
        return [lead, ...previousLeads];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderLead = ({ item }) => {
    return (
      <View style={leadStyles.leadCard}>
        <Text style={leadStyles.leadTitle}>
          New Lead
        </Text>

        <Text style={leadStyles.field}>
          <Text style={leadStyles.fieldName}>Name: </Text>
          <Text style={leadStyles.fieldValue}>
            {item.name || item.full_name || "Not provided"}
          </Text>
        </Text>

        <Text style={leadStyles.field}>
          <Text style={leadStyles.fieldName}>Email: </Text>
          <Text style={leadStyles.fieldValue}>
            {item.email || "Not provided"}
          </Text>
        </Text>

        <Text style={leadStyles.field}>
          <Text style={leadStyles.fieldName}>Phone: </Text>
          <Text style={leadStyles.fieldValue}>
            {item.phone ||
              item.phone_number ||
              "Not provided"}
          </Text>
        </Text>

        {item.leadgen_id && (
          <Text style={leadStyles.leadId}>
            Lead ID: {item.leadgen_id}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={leadStyles.container}>
      <View style={leadStyles.header}>
        <Text style={leadStyles.title}>
          Meta Leads
        </Text>

        <View
          style={[
            leadStyles.connectionStatus,
            connected
              ? leadStyles.connected
              : leadStyles.disconnected,
          ]}
        >
          <Text style={leadStyles.connectionText}>
            {connected
              ? "● Connected"
              : "● Disconnected"}
          </Text>
        </View>
      </View>

      {leads.length === 0 ? (
        <View style={leadStyles.emptyContainer}>
          <Text style={leadStyles.emptyTitle}>
            No leads yet
          </Text>

          <Text style={leadStyles.emptyText}>
            Submit a test lead and it will appear here
            automatically.
          </Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item, index) =>
            String(
              item.leadgen_id ||
                item.id ||
                index
            )
          }
          renderItem={renderLead}
          contentContainerStyle={leadStyles.list}
        />
      )}
    </SafeAreaView>
  );
}