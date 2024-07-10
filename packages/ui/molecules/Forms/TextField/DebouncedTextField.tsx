import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";

import { withDebounce } from "../../../hooks/useDebounce";

export const DebouncedTextField = withDebounce(TextField);
