import { TextField } from "@clubmed/trident-ui/ui/forms/TextField";

import { withDebounce } from "../../../hooks/useDebounce";

export const DebouncedTextField = withDebounce(TextField);
