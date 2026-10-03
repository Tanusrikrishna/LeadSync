import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Meta Leads",
          headerShown: false,
        }}
      />
    </Stack>
  );
}