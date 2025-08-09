"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/mockApi"
import { ProductWithOffers } from "@/types/product"

export function Search() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['products', { query: searchQuery }],
    queryFn: () => getProducts({ query: searchQuery }, 1, 5), // Fetch top 5 results
    enabled: searchQuery.length > 0, // Only run query if user has typed something
  });

  const products = data?.data || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? products.find((product) => product.name.toLowerCase() === value)?.name
            : "Zoek een product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput 
            placeholder="Zoek op merk of productnaam..."
            onValueChange={(search) => setSearchQuery(search)}
          />
          <CommandEmpty>{isLoading ? "Aan het zoeken..." : "Geen product gevonden."}</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name.toLowerCase()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  // Here you would typically navigate to the product page
                  console.log("Selected product:", product.id, product.name)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === product.name.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
