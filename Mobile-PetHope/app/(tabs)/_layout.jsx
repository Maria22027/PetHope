import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabsLayout = () => {
  return (
    <Tabs
       screenOptions={{
            headerShown: false,
            tabBarStyle: {
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            },
        }}
    >

      <Tabs.Screen 
        name = "index"
        options={{
          title: "Home",
          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />
        }}
      />

      <Tabs.Screen 
        name = "adotar"
        options={{
          title: "Adotar",
          tabBarIcon: ({color, size}) => <Ionicons name="paw" size={size} color={color} />
        }}
      />

      <Tabs.Screen 
        name = "doar"
        options={{
          title: "Doar",
          tabBarIcon: ({color, size}) => <Ionicons name="heart" size={size} color={color} />
        }}
      />

      <Tabs.Screen 
        name = "perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({color, size}) => <FontAwesome name="user" size={size} color={color} />
        }}
      />

    </Tabs>
  );
}
export default TabsLayout;