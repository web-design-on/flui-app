import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { colors } from "../lib/theme/colors";

interface FormFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
}

/**
 * Input de texto padrão com label acima e, quando `error` é passado,
 * borda vermelha + mensagem de erro abaixo (mesmo padrão usado em
 * toda a tela de cadastro).
 */
export default function FormField({
  label,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.neutral.placeholder}
        style={[styles.input, error ? styles.inputError : null]}
        {...inputProps}
      />
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.neutral.textMuted,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: colors.neutral.surface,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.neutral.text,
  },
  inputError: { borderColor: colors.semantic.errorBorder },
  fieldError: {
    fontSize: 12,
    color: colors.semantic.errorBright,
    marginTop: 4,
    marginLeft: 4,
  },
});
