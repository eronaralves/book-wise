import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export const getQueryClient = cache(() => new QueryClient());