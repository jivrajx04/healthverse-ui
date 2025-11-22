import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { User, Stethoscope, FlaskConical } from 'lucide-react-native';

export type Role = 'patient' | 'doctor' | 'lab';

interface RoleSelectorProps {
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
}

const roles: { id: Role; label: string; icon: typeof User }[] = [
  { id: 'patient', label: 'Patient', icon: User },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  { id: 'lab', label: 'Lab', icon: FlaskConical },
];

export default function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;

        return (
          <TouchableOpacity
            key={role.id}
            onPress={() => onSelectRole(role.id)}
            activeOpacity={0.7}
            style={styles.chipTouchable}
          >
            <MotiView
              animate={{
                backgroundColor: isSelected ? 'rgba(183, 148, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                borderColor: isSelected ? 'rgba(183, 148, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                scale: isSelected ? 1 : 1,
              }}
              transition={{
                type: 'timing',
                duration: 250,
              }}
              style={styles.chip}
            >
              <Icon
                size={15}
                color={isSelected ? '#b794f6' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth={1.8}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]} allowFontScaling={false}>
                {role.label}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
    justifyContent: 'center',
  },
  chipTouchable: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: -0.3,
  },
  chipTextSelected: {
    color: '#b794f6',
    fontFamily: 'Inter-SemiBold',
  },
});
