declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"roadmaps": {
"typescript.mdx": {
	id: "typescript.mdx";
  slug: "typescript";
  body: string;
  collection: "roadmaps";
  data: InferEntrySchema<"roadmaps">
} & { render(): Render[".mdx"] };
};
"videos": {
"-1YhP5IOBCI.mdx": {
	id: "-1YhP5IOBCI.mdx";
  slug: "-1yhp5iobci";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"-JK1Fd6o74o.mdx": {
	id: "-JK1Fd6o74o.mdx";
  slug: "-jk1fd6o74o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"-RoKGk5Lju0.mdx": {
	id: "-RoKGk5Lju0.mdx";
  slug: "-rokgk5lju0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"-TsIUuA3yyE.mdx": {
	id: "-TsIUuA3yyE.mdx";
  slug: "-tsiuua3yye";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"-urz6Sh7RE8.mdx": {
	id: "-urz6Sh7RE8.mdx";
  slug: "-urz6sh7re8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0-BsmzlMMIw.mdx": {
	id: "0-BsmzlMMIw.mdx";
  slug: "0-bsmzlmmiw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0Bk-oqVaHs4.mdx": {
	id: "0Bk-oqVaHs4.mdx";
  slug: "0bk-oqvahs4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0W4SdogReDg.mdx": {
	id: "0W4SdogReDg.mdx";
  slug: "0w4sdogredg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0WIFW3s2fDM.mdx": {
	id: "0WIFW3s2fDM.mdx";
  slug: "0wifw3s2fdm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0eoyWYP6I4Q.mdx": {
	id: "0eoyWYP6I4Q.mdx";
  slug: "0eoywyp6i4q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0nDGeQKLFjo.mdx": {
	id: "0nDGeQKLFjo.mdx";
  slug: "0ndgeqklfjo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"0vumsisnqwM.mdx": {
	id: "0vumsisnqwM.mdx";
  slug: "0vumsisnqwm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"10HkuC8H9m8.mdx": {
	id: "10HkuC8H9m8.mdx";
  slug: "10hkuc8h9m8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"1jlEEmiBSvI.mdx": {
	id: "1jlEEmiBSvI.mdx";
  slug: "1jleemibsvi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"1kFX3B2IyH0.mdx": {
	id: "1kFX3B2IyH0.mdx";
  slug: "1kfx3b2iyh0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"1x7mI_xuVVo.mdx": {
	id: "1x7mI_xuVVo.mdx";
  slug: "1x7mi_xuvvo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"1zCUMlFTDg0.mdx": {
	id: "1zCUMlFTDg0.mdx";
  slug: "1zcumlftdg0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"2DbX0xFL0nk.mdx": {
	id: "2DbX0xFL0nk.mdx";
  slug: "2dbx0xfl0nk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"2Dz2BLDcgRU.mdx": {
	id: "2Dz2BLDcgRU.mdx";
  slug: "2dz2bldcgru";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"2rrwPm8fuis.mdx": {
	id: "2rrwPm8fuis.mdx";
  slug: "2rrwpm8fuis";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"2sAdzy90GtE.mdx": {
	id: "2sAdzy90GtE.mdx";
  slug: "2sadzy90gte";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"2tJedF8I-8Q.mdx": {
	id: "2tJedF8I-8Q.mdx";
  slug: "2tjedf8i-8q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"3Q2q2gs0nAI.mdx": {
	id: "3Q2q2gs0nAI.mdx";
  slug: "3q2q2gs0nai";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"3dLCvAvkjNA.mdx": {
	id: "3dLCvAvkjNA.mdx";
  slug: "3dlcvavkjna";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"432thqUKs-Y.mdx": {
	id: "432thqUKs-Y.mdx";
  slug: "432thquks-y";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"47wDMcPONAw.mdx": {
	id: "47wDMcPONAw.mdx";
  slug: "47wdmcponaw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"49IWKWOZthY.mdx": {
	id: "49IWKWOZthY.mdx";
  slug: "49iwkwozthy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4MmmlWwlST4.mdx": {
	id: "4MmmlWwlST4.mdx";
  slug: "4mmmlwwlst4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4PoNBZl4t0Y.mdx": {
	id: "4PoNBZl4t0Y.mdx";
  slug: "4ponbzl4t0y";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4QFI4Fd4e0o.mdx": {
	id: "4QFI4Fd4e0o.mdx";
  slug: "4qfi4fd4e0o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4U067O3_fYk.mdx": {
	id: "4U067O3_fYk.mdx";
  slug: "4u067o3_fyk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4XTj6sIGTdc.mdx": {
	id: "4XTj6sIGTdc.mdx";
  slug: "4xtj6sigtdc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4b9LSUZjtzE.mdx": {
	id: "4b9LSUZjtzE.mdx";
  slug: "4b9lsuzjtze";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4cbP95OcfR0.mdx": {
	id: "4cbP95OcfR0.mdx";
  slug: "4cbp95ocfr0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4wfqc7roa0Q.mdx": {
	id: "4wfqc7roa0Q.mdx";
  slug: "4wfqc7roa0q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4y46iRN5Vec.mdx": {
	id: "4y46iRN5Vec.mdx";
  slug: "4y46irn5vec";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"4zRhgxctUYQ.mdx": {
	id: "4zRhgxctUYQ.mdx";
  slug: "4zrhgxctuyq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"56_OUG-0wgI.mdx": {
	id: "56_OUG-0wgI.mdx";
  slug: "56_oug-0wgi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"5WbpZlJCWNk.mdx": {
	id: "5WbpZlJCWNk.mdx";
  slug: "5wbpzljcwnk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"5lm5xJVqfmA.mdx": {
	id: "5lm5xJVqfmA.mdx";
  slug: "5lm5xjvqfma";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"5m7Al81Um88.mdx": {
	id: "5m7Al81Um88.mdx";
  slug: "5m7al81um88";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"5q0VtzJjvNc.mdx": {
	id: "5q0VtzJjvNc.mdx";
  slug: "5q0vtzjjvnc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"5zwzyHqBFnA.mdx": {
	id: "5zwzyHqBFnA.mdx";
  slug: "5zwzyhqbfna";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"6kLh_XQLNa8.mdx": {
	id: "6kLh_XQLNa8.mdx";
  slug: "6klh_xqlna8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"6yBv-_COJkk.mdx": {
	id: "6yBv-_COJkk.mdx";
  slug: "6ybv-_cojkk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7I-CY1a-Jpk.mdx": {
	id: "7I-CY1a-Jpk.mdx";
  slug: "7i-cy1a-jpk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7kNLXE0hixM.mdx": {
	id: "7kNLXE0hixM.mdx";
  slug: "7knlxe0hixm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7ldI5jBsmlI.mdx": {
	id: "7ldI5jBsmlI.mdx";
  slug: "7ldi5jbsmli";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7o1P-SB7yQw.mdx": {
	id: "7o1P-SB7yQw.mdx";
  slug: "7o1p-sb7yqw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7x3p5F0TgUA.mdx": {
	id: "7x3p5F0TgUA.mdx";
  slug: "7x3p5f0tgua";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"7xHtGNVQktI.mdx": {
	id: "7xHtGNVQktI.mdx";
  slug: "7xhtgnvqkti";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"87hg99a9cjE.mdx": {
	id: "87hg99a9cjE.mdx";
  slug: "87hg99a9cje";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"8Iic7y3y0FE.mdx": {
	id: "8Iic7y3y0FE.mdx";
  slug: "8iic7y3y0fe";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"8M5rpG9TD-c.mdx": {
	id: "8M5rpG9TD-c.mdx";
  slug: "8m5rpg9td-c";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"8QtiqXew2QQ.mdx": {
	id: "8QtiqXew2QQ.mdx";
  slug: "8qtiqxew2qq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"9y0eY6hs1QM.mdx": {
	id: "9y0eY6hs1QM.mdx";
  slug: "9y0ey6hs1qm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"AU7dKWNfWiA.mdx": {
	id: "AU7dKWNfWiA.mdx";
  slug: "au7dkwnfwia";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"AknVkHeYqqg.mdx": {
	id: "AknVkHeYqqg.mdx";
  slug: "aknvkheyqqg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"BdzFpyGVfVI.mdx": {
	id: "BdzFpyGVfVI.mdx";
  slug: "bdzfpygvfvi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"BtIlaOuN18c.mdx": {
	id: "BtIlaOuN18c.mdx";
  slug: "btilaoun18c";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Bw_tmWEaaIU.mdx": {
	id: "Bw_tmWEaaIU.mdx";
  slug: "bw_tmweaaiu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"C9Lrz9SHqgw.mdx": {
	id: "C9Lrz9SHqgw.mdx";
  slug: "c9lrz9shqgw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"CO7vEjsw3cc.mdx": {
	id: "CO7vEjsw3cc.mdx";
  slug: "co7vejsw3cc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"CZMXRMdHm34.mdx": {
	id: "CZMXRMdHm34.mdx";
  slug: "czmxrmdhm34";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"CkHR0OXTYXI.mdx": {
	id: "CkHR0OXTYXI.mdx";
  slug: "ckhr0oxtyxi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Cos-ctPX5hw.mdx": {
	id: "Cos-ctPX5hw.mdx";
  slug: "cos-ctpx5hw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Cp64YbYBNDA.mdx": {
	id: "Cp64YbYBNDA.mdx";
  slug: "cp64ybybnda";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"D3PuSLokPZg.mdx": {
	id: "D3PuSLokPZg.mdx";
  slug: "d3puslokpzg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"D3XYAx30CNc.mdx": {
	id: "D3XYAx30CNc.mdx";
  slug: "d3xyax30cnc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DEPwA3mv_R8.mdx": {
	id: "DEPwA3mv_R8.mdx";
  slug: "depwa3mv_r8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DHjZnJRK_S8.mdx": {
	id: "DHjZnJRK_S8.mdx";
  slug: "dhjznjrk_s8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DLel3G4XUZ8.mdx": {
	id: "DLel3G4XUZ8.mdx";
  slug: "dlel3g4xuz8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DM6CgUFyXxw.mdx": {
	id: "DM6CgUFyXxw.mdx";
  slug: "dm6cgufyxxw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DbVCjGHpVyc.mdx": {
	id: "DbVCjGHpVyc.mdx";
  slug: "dbvcjghpvyc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DjzlGfhUyAM.mdx": {
	id: "DjzlGfhUyAM.mdx";
  slug: "djzlgfhuyam";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DuGyH5RvfbY.mdx": {
	id: "DuGyH5RvfbY.mdx";
  slug: "dugyh5rvfby";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"DxG17pbgsZg.mdx": {
	id: "DxG17pbgsZg.mdx";
  slug: "dxg17pbgszg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"E0V3td6Il8I.mdx": {
	id: "E0V3td6Il8I.mdx";
  slug: "e0v3td6il8i";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"E4TH77SMOG8.mdx": {
	id: "E4TH77SMOG8.mdx";
  slug: "e4th77smog8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"EFVCTzqRbqo.mdx": {
	id: "EFVCTzqRbqo.mdx";
  slug: "efvctzqrbqo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"EH9Suo_J4Ks.mdx": {
	id: "EH9Suo_J4Ks.mdx";
  slug: "eh9suo_j4ks";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"EOo56veFvhY.mdx": {
	id: "EOo56veFvhY.mdx";
  slug: "eoo56vefvhy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"EXI9v6i7bAo.mdx": {
	id: "EXI9v6i7bAo.mdx";
  slug: "exi9v6i7bao";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"EzJF0IUoYhQ.mdx": {
	id: "EzJF0IUoYhQ.mdx";
  slug: "ezjf0iuoyhq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"F-0SZ_TicXA.mdx": {
	id: "F-0SZ_TicXA.mdx";
  slug: "f-0sz_ticxa";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"F5cBad7_Bd0.mdx": {
	id: "F5cBad7_Bd0.mdx";
  slug: "f5cbad7_bd0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FC5gM49xQPE.mdx": {
	id: "FC5gM49xQPE.mdx";
  slug: "fc5gm49xqpe";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FFu0-9hGyX4.mdx": {
	id: "FFu0-9hGyX4.mdx";
  slug: "ffu0-9hgyx4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FTGWIH4RlHg.mdx": {
	id: "FTGWIH4RlHg.mdx";
  slug: "ftgwih4rlhg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FfHsIio4aCU.mdx": {
	id: "FfHsIio4aCU.mdx";
  slug: "ffhsiio4acu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FmGYLJlhXco.mdx": {
	id: "FmGYLJlhXco.mdx";
  slug: "fmgyljlhxco";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FrLzKMWa3Gk.mdx": {
	id: "FrLzKMWa3Gk.mdx";
  slug: "frlzkmwa3gk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"FrusJNycQvk.mdx": {
	id: "FrusJNycQvk.mdx";
  slug: "frusjnycqvk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"G1gyXbLdRzc.mdx": {
	id: "G1gyXbLdRzc.mdx";
  slug: "g1gyxbldrzc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GBAO3YKMonI.mdx": {
	id: "GBAO3YKMonI.mdx";
  slug: "gbao3ykmoni";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GHsO0t1_P0M.mdx": {
	id: "GHsO0t1_P0M.mdx";
  slug: "ghso0t1_p0m";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GMeQ51MCegI.mdx": {
	id: "GMeQ51MCegI.mdx";
  slug: "gmeq51mcegi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GNNBxTY1_C0.mdx": {
	id: "GNNBxTY1_C0.mdx";
  slug: "gnnbxty1_c0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GjkQS5J6K6k.mdx": {
	id: "GjkQS5J6K6k.mdx";
  slug: "gjkqs5j6k6k";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GkUFmlVs-No.mdx": {
	id: "GkUFmlVs-No.mdx";
  slug: "gkufmlvs-no";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"GsRnExrC89A.mdx": {
	id: "GsRnExrC89A.mdx";
  slug: "gsrnexrc89a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"H2kxc_ZrSPI.mdx": {
	id: "H2kxc_ZrSPI.mdx";
  slug: "h2kxc_zrspi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"HUVawJXeHfU.mdx": {
	id: "HUVawJXeHfU.mdx";
  slug: "huvawjxehfu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"HbSvuxr2kzA.mdx": {
	id: "HbSvuxr2kzA.mdx";
  slug: "hbsvuxr2kza";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"HefhXiP2IvI.mdx": {
	id: "HefhXiP2IvI.mdx";
  slug: "hefhxip2ivi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Hsk5tM_N420.mdx": {
	id: "Hsk5tM_N420.mdx";
  slug: "hsk5tm_n420";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"HwNArS3f1Ss.mdx": {
	id: "HwNArS3f1Ss.mdx";
  slug: "hwnars3f1ss";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"HxyaftP6hJ8.mdx": {
	id: "HxyaftP6hJ8.mdx";
  slug: "hxyaftp6hj8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ICeH3uBGGeo.mdx": {
	id: "ICeH3uBGGeo.mdx";
  slug: "iceh3ubggeo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ILbRI4m2D9Y.mdx": {
	id: "ILbRI4m2D9Y.mdx";
  slug: "ilbri4m2d9y";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ITVS76JpNn8.mdx": {
	id: "ITVS76JpNn8.mdx";
  slug: "itvs76jpnn8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"InnDVEup61U.mdx": {
	id: "InnDVEup61U.mdx";
  slug: "inndveup61u";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"J-M11cC_NL4.mdx": {
	id: "J-M11cC_NL4.mdx";
  slug: "j-m11cc_nl4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"J1gzN1SAhyM.mdx": {
	id: "J1gzN1SAhyM.mdx";
  slug: "j1gzn1sahym";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"J1nq8zBkwMQ.mdx": {
	id: "J1nq8zBkwMQ.mdx";
  slug: "j1nq8zbkwmq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"J81MS6H1NBQ.mdx": {
	id: "J81MS6H1NBQ.mdx";
  slug: "j81ms6h1nbq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JBu2ZTPgiKI.mdx": {
	id: "JBu2ZTPgiKI.mdx";
  slug: "jbu2ztpgiki";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JKj-J83Qop0.mdx": {
	id: "JKj-J83Qop0.mdx";
  slug: "jkj-j83qop0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JRZCqUOmFwY.mdx": {
	id: "JRZCqUOmFwY.mdx";
  slug: "jrzcquomfwy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JaM2rExmmqs.mdx": {
	id: "JaM2rExmmqs.mdx";
  slug: "jam2rexmmqs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JauJhGTBFsc.mdx": {
	id: "JauJhGTBFsc.mdx";
  slug: "jaujhgtbfsc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"JgsHV7ZR9wk.mdx": {
	id: "JgsHV7ZR9wk.mdx";
  slug: "jgshv7zr9wk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"K-yQB9YGmgE.mdx": {
	id: "K-yQB9YGmgE.mdx";
  slug: "k-yqb9ygmge";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"KBoNbQPQwwQ.mdx": {
	id: "KBoNbQPQwwQ.mdx";
  slug: "kbonbqpqwwq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"KBwhyxWGFsE.mdx": {
	id: "KBwhyxWGFsE.mdx";
  slug: "kbwhyxwgfse";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"KEc0LLQjyfQ.mdx": {
	id: "KEc0LLQjyfQ.mdx";
  slug: "kec0llqjyfq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Kn8TKLcd6d4.mdx": {
	id: "Kn8TKLcd6d4.mdx";
  slug: "kn8tklcd6d4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LAu1p6tmj_Y.mdx": {
	id: "LAu1p6tmj_Y.mdx";
  slug: "lau1p6tmj_y";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LDS1ll93P-s.mdx": {
	id: "LDS1ll93P-s.mdx";
  slug: "lds1ll93p-s";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LKVHFHJsiO0.mdx": {
	id: "LKVHFHJsiO0.mdx";
  slug: "lkvhfhjsio0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LZc2hSghezM.mdx": {
	id: "LZc2hSghezM.mdx";
  slug: "lzc2hsghezm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Lam0cYOEst8.mdx": {
	id: "Lam0cYOEst8.mdx";
  slug: "lam0cyoest8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LsvZM7ihXQI.mdx": {
	id: "LsvZM7ihXQI.mdx";
  slug: "lsvzm7ihxqi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"LyS1bB96FDg.mdx": {
	id: "LyS1bB96FDg.mdx";
  slug: "lys1bb96fdg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"M9tMuM5TuDQ.mdx": {
	id: "M9tMuM5TuDQ.mdx";
  slug: "m9tmum5tudq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MJaGti42c5c.mdx": {
	id: "MJaGti42c5c.mdx";
  slug: "mjagti42c5c";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MLLALr3ctoE.mdx": {
	id: "MLLALr3ctoE.mdx";
  slug: "mllalr3ctoe";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MU8_LP8R_ZI.mdx": {
	id: "MU8_LP8R_ZI.mdx";
  slug: "mu8_lp8r_zi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MVCV38iQ5SU.mdx": {
	id: "MVCV38iQ5SU.mdx";
  slug: "mvcv38iq5su";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Mi6sosJuDDY.mdx": {
	id: "Mi6sosJuDDY.mdx";
  slug: "mi6sosjuddy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MkNCkKomu_s.mdx": {
	id: "MkNCkKomu_s.mdx";
  slug: "mknckkomu_s";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MlDTHzK1vKI.mdx": {
	id: "MlDTHzK1vKI.mdx";
  slug: "mldthzk1vki";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"MpdFj8MEuJA.mdx": {
	id: "MpdFj8MEuJA.mdx";
  slug: "mpdfj8meuja";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Mt5ocZi8JS0.mdx": {
	id: "Mt5ocZi8JS0.mdx";
  slug: "mt5oczi8js0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NCSkAUP3Nv0.mdx": {
	id: "NCSkAUP3Nv0.mdx";
  slug: "ncskaup3nv0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NF7FFughuA4.mdx": {
	id: "NF7FFughuA4.mdx";
  slug: "nf7ffughua4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NGqoq5D_rEE.mdx": {
	id: "NGqoq5D_rEE.mdx";
  slug: "ngqoq5d_ree";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NJxagi7K-D8.mdx": {
	id: "NJxagi7K-D8.mdx";
  slug: "njxagi7k-d8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NaJI7RkSPx8.mdx": {
	id: "NaJI7RkSPx8.mdx";
  slug: "naji7rkspx8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NgkYH97Z3nk.mdx": {
	id: "NgkYH97Z3nk.mdx";
  slug: "ngkyh97z3nk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NjKOAbWqOM4.mdx": {
	id: "NjKOAbWqOM4.mdx";
  slug: "njkoabwqom4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"NkUf0ULcWAE.mdx": {
	id: "NkUf0ULcWAE.mdx";
  slug: "nkuf0ulcwae";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"OCg4DJyVGk0.mdx": {
	id: "OCg4DJyVGk0.mdx";
  slug: "ocg4djyvgk0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ONPlUclYGxk.mdx": {
	id: "ONPlUclYGxk.mdx";
  slug: "onpluclygxk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"OpMAH2hzKi8.mdx": {
	id: "OpMAH2hzKi8.mdx";
  slug: "opmah2hzki8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"OqcHoLWyyIw.mdx": {
	id: "OqcHoLWyyIw.mdx";
  slug: "oqcholwyyiw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"OseG8oQ2RDM.mdx": {
	id: "OseG8oQ2RDM.mdx";
  slug: "oseg8oq2rdm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"P0GxuOPyLXo.mdx": {
	id: "P0GxuOPyLXo.mdx";
  slug: "p0gxuopylxo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"P95DuIBwnqw.mdx": {
	id: "P95DuIBwnqw.mdx";
  slug: "p95duibwnqw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"PSzCtdM20Fc.mdx": {
	id: "PSzCtdM20Fc.mdx";
  slug: "pszctdm20fc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"P_5Yxktq9Rs.mdx": {
	id: "P_5Yxktq9Rs.mdx";
  slug: "p_5yxktq9rs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"PbswZshAKF8.mdx": {
	id: "PbswZshAKF8.mdx";
  slug: "pbswzshakf8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Q-jnCu85PEc.mdx": {
	id: "Q-jnCu85PEc.mdx";
  slug: "q-jncu85pec";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Q4QDyr0jLfo.mdx": {
	id: "Q4QDyr0jLfo.mdx";
  slug: "q4qdyr0jlfo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Q4dos7-gX68.mdx": {
	id: "Q4dos7-gX68.mdx";
  slug: "q4dos7-gx68";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"QChEaOHauZY.mdx": {
	id: "QChEaOHauZY.mdx";
  slug: "qcheaohauzy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"QISH8M3y6iY.mdx": {
	id: "QISH8M3y6iY.mdx";
  slug: "qish8m3y6iy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"QpilBWeiO8A.mdx": {
	id: "QpilBWeiO8A.mdx";
  slug: "qpilbweio8a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Qs7NkP6TJn8.mdx": {
	id: "Qs7NkP6TJn8.mdx";
  slug: "qs7nkp6tjn8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"QuLfCUh-iwI.mdx": {
	id: "QuLfCUh-iwI.mdx";
  slug: "qulfcuh-iwi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"QvcyL_ZGhf0.mdx": {
	id: "QvcyL_ZGhf0.mdx";
  slug: "qvcyl_zghf0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"R5IxHxfgjT0.mdx": {
	id: "R5IxHxfgjT0.mdx";
  slug: "r5ixhxfgjt0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"RAJD4KpX8LA.mdx": {
	id: "RAJD4KpX8LA.mdx";
  slug: "rajd4kpx8la";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"RCgJQq_pDfg.mdx": {
	id: "RCgJQq_pDfg.mdx";
  slug: "rcgjqq_pdfg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"RMv-aC3TaGs.mdx": {
	id: "RMv-aC3TaGs.mdx";
  slug: "rmv-ac3tags";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"RXuOyR3yscM.mdx": {
	id: "RXuOyR3yscM.mdx";
  slug: "rxuoyr3yscm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"RonRwypIVaw.mdx": {
	id: "RonRwypIVaw.mdx";
  slug: "ronrwypivaw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"S2L4fatK0Ek.mdx": {
	id: "S2L4fatK0Ek.mdx";
  slug: "s2l4fatk0ek";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"S6Tu8oXyoRk.mdx": {
	id: "S6Tu8oXyoRk.mdx";
  slug: "s6tu8oxyork";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"SBysJEnvvhQ.mdx": {
	id: "SBysJEnvvhQ.mdx";
  slug: "sbysjenvvhq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"SZ2kAkMdAZE.mdx": {
	id: "SZ2kAkMdAZE.mdx";
  slug: "sz2kakmdaze";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Srq7nUi-LUc.mdx": {
	id: "Srq7nUi-LUc.mdx";
  slug: "srq7nui-luc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Sti_XBFn5Xw.mdx": {
	id: "Sti_XBFn5Xw.mdx";
  slug: "sti_xbfn5xw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"T3m-MZkuadU.mdx": {
	id: "T3m-MZkuadU.mdx";
  slug: "t3m-mzkuadu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"TmhvqvjK5nM.mdx": {
	id: "TmhvqvjK5nM.mdx";
  slug: "tmhvqvjk5nm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"UbEx1v26kCs.mdx": {
	id: "UbEx1v26kCs.mdx";
  slug: "ubex1v26kcs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"UgYr63qcQCc.mdx": {
	id: "UgYr63qcQCc.mdx";
  slug: "ugyr63qcqcc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"VAIR7cRBlFw.mdx": {
	id: "VAIR7cRBlFw.mdx";
  slug: "vair7crblfw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"VBbkLd-_dPU.mdx": {
	id: "VBbkLd-_dPU.mdx";
  slug: "vbbkld-_dpu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"VcOMq3LQtBU.mdx": {
	id: "VcOMq3LQtBU.mdx";
  slug: "vcomq3lqtbu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ViVa5JPGrf4.mdx": {
	id: "ViVa5JPGrf4.mdx";
  slug: "viva5jpgrf4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"VrfJeXj7TiQ.mdx": {
	id: "VrfJeXj7TiQ.mdx";
  slug: "vrfjexj7tiq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"W0RbrAZtj7I.mdx": {
	id: "W0RbrAZtj7I.mdx";
  slug: "w0rbraztj7i";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"W5TXxJIyBP0.mdx": {
	id: "W5TXxJIyBP0.mdx";
  slug: "w5txxjiybp0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"WOfL5q2HznI.mdx": {
	id: "WOfL5q2HznI.mdx";
  slug: "wofl5q2hzni";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"WyS3mF4wJKw.mdx": {
	id: "WyS3mF4wJKw.mdx";
  slug: "wys3mf4wjkw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"XYq9QpgAx8g.mdx": {
	id: "XYq9QpgAx8g.mdx";
  slug: "xyq9qpgax8g";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"XaQiY_Zi5YM.mdx": {
	id: "XaQiY_Zi5YM.mdx";
  slug: "xaqiy_zi5ym";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"XnlECbwcJZ0.mdx": {
	id: "XnlECbwcJZ0.mdx";
  slug: "xnlecbwcjz0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"XnyZXNnWAOA.mdx": {
	id: "XnyZXNnWAOA.mdx";
  slug: "xnyzxnnwaoa";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Xt1dNdJpgw4.mdx": {
	id: "Xt1dNdJpgw4.mdx";
  slug: "xt1dndjpgw4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Xw9XMNn2k0o.mdx": {
	id: "Xw9XMNn2k0o.mdx";
  slug: "xw9xmnn2k0o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"XzE-PzALyDc.mdx": {
	id: "XzE-PzALyDc.mdx";
  slug: "xze-pzalydc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Y7oS9Evn_2o.mdx": {
	id: "Y7oS9Evn_2o.mdx";
  slug: "y7os9evn_2o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"YQvQwTAqXE8.mdx": {
	id: "YQvQwTAqXE8.mdx";
  slug: "yqvqwtaqxe8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"YlU9vznPWIk.mdx": {
	id: "YlU9vznPWIk.mdx";
  slug: "ylu9vznpwik";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"YzPDzWM_k_8.mdx": {
	id: "YzPDzWM_k_8.mdx";
  slug: "yzpdzwm_k_8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Z0Odn0pCf9w.mdx": {
	id: "Z0Odn0pCf9w.mdx";
  slug: "z0odn0pcf9w";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ZD7viwwRLAw.mdx": {
	id: "ZD7viwwRLAw.mdx";
  slug: "zd7viwwrlaw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ZFNxTy3fOO0.mdx": {
	id: "ZFNxTy3fOO0.mdx";
  slug: "zfnxty3foo0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ZG3xZP0SXYs.mdx": {
	id: "ZG3xZP0SXYs.mdx";
  slug: "zg3xzp0sxys";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ZKlXqrcBx88.mdx": {
	id: "ZKlXqrcBx88.mdx";
  slug: "zklxqrcbx88";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ZLMjJL70glE.mdx": {
	id: "ZLMjJL70glE.mdx";
  slug: "zlmjjl70gle";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"Zwd_8Jy7b-c.mdx": {
	id: "Zwd_8Jy7b-c.mdx";
  slug: "zwd_8jy7b-c";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"aDqGIhl7cdo.mdx": {
	id: "aDqGIhl7cdo.mdx";
  slug: "adqgihl7cdo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"aHA581Mp2Mo.mdx": {
	id: "aHA581Mp2Mo.mdx";
  slug: "aha581mp2mo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"aM1bxz-82Qw.mdx": {
	id: "aM1bxz-82Qw.mdx";
  slug: "am1bxz-82qw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"aOt4Hz3ze3Q.mdx": {
	id: "aOt4Hz3ze3Q.mdx";
  slug: "aot4hz3ze3q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"apg9XR35pAM.mdx": {
	id: "apg9XR35pAM.mdx";
  slug: "apg9xr35pam";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"azsMsfUDrD0.mdx": {
	id: "azsMsfUDrD0.mdx";
  slug: "azsmsfudrd0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"b-Eo2v0EzFw.mdx": {
	id: "b-Eo2v0EzFw.mdx";
  slug: "b-eo2v0ezfw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"bCU9BUfwUJE.mdx": {
	id: "bCU9BUfwUJE.mdx";
  slug: "bcu9bufwuje";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"bLyl4VDNPyY.mdx": {
	id: "bLyl4VDNPyY.mdx";
  slug: "blyl4vdnpyy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"b_p3yP57A9w.mdx": {
	id: "b_p3yP57A9w.mdx";
  slug: "b_p3yp57a9w";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"bk5JvHGFv3A.mdx": {
	id: "bk5JvHGFv3A.mdx";
  slug: "bk5jvhgfv3a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"bmKDT-yG2eE.mdx": {
	id: "bmKDT-yG2eE.mdx";
  slug: "bmkdt-yg2ee";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"bvdHVxqjv80.mdx": {
	id: "bvdHVxqjv80.mdx";
  slug: "bvdhvxqjv80";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"cByutNrBOFc.mdx": {
	id: "cByutNrBOFc.mdx";
  slug: "cbyutnrbofc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"cHUAvVkOBvY.mdx": {
	id: "cHUAvVkOBvY.mdx";
  slug: "chuavvkobvy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"cg_lV21vU-E.mdx": {
	id: "cg_lV21vU-E.mdx";
  slug: "cg_lv21vu-e";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ciQdQkT0bZk.mdx": {
	id: "ciQdQkT0bZk.mdx";
  slug: "ciqdqkt0bzk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"cpG5W4uyqz0.mdx": {
	id: "cpG5W4uyqz0.mdx";
  slug: "cpg5w4uyqz0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"czvSZqnpTHs.mdx": {
	id: "czvSZqnpTHs.mdx";
  slug: "czvszqnpths";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"d58QLA2bnug.mdx": {
	id: "d58QLA2bnug.mdx";
  slug: "d58qla2bnug";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"dH6i3GurZW8.mdx": {
	id: "dH6i3GurZW8.mdx";
  slug: "dh6i3gurzw8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"dMkYWwYmJB8.mdx": {
	id: "dMkYWwYmJB8.mdx";
  slug: "dmkywwymjb8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"e8Aqtak8stI.mdx": {
	id: "e8Aqtak8stI.mdx";
  slug: "e8aqtak8sti";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"eAfUfKYcvBo.mdx": {
	id: "eAfUfKYcvBo.mdx";
  slug: "eafufkycvbo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"eFh2Kr9hfyo.mdx": {
	id: "eFh2Kr9hfyo.mdx";
  slug: "efh2kr9hfyo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"eQE9wp4PTY4.mdx": {
	id: "eQE9wp4PTY4.mdx";
  slug: "eqe9wp4pty4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"eVfw4pRDUIY.mdx": {
	id: "eVfw4pRDUIY.mdx";
  slug: "evfw4prduiy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ekIDdZE7YjM.mdx": {
	id: "ekIDdZE7YjM.mdx";
  slug: "ekiddze7yjm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"emhwHjAsyss.mdx": {
	id: "emhwHjAsyss.mdx";
  slug: "emhwhjasyss";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"erfWjBNDdOE.mdx": {
	id: "erfWjBNDdOE.mdx";
  slug: "erfwjbnddoe";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"f3Cn0CGytSQ.mdx": {
	id: "f3Cn0CGytSQ.mdx";
  slug: "f3cn0cgytsq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"fXD9Ct03Q6k.mdx": {
	id: "fXD9Ct03Q6k.mdx";
  slug: "fxd9ct03q6k";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"fu10QR3IU-k.mdx": {
	id: "fu10QR3IU-k.mdx";
  slug: "fu10qr3iu-k";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"g1LtqLVKgIA.mdx": {
	id: "g1LtqLVKgIA.mdx";
  slug: "g1ltqlvkgia";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gChqkchbn9o.mdx": {
	id: "gChqkchbn9o.mdx";
  slug: "gchqkchbn9o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gED6KGBQgak.mdx": {
	id: "gED6KGBQgak.mdx";
  slug: "ged6kgbqgak";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gSHPdskFL-Q.mdx": {
	id: "gSHPdskFL-Q.mdx";
  slug: "gshpdskfl-q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gXbUeZZ2l78.mdx": {
	id: "gXbUeZZ2l78.mdx";
  slug: "gxbuezz2l78";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gg31JTZmFUw.mdx": {
	id: "gg31JTZmFUw.mdx";
  slug: "gg31jtzmfuw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gi4c7fbeURc.mdx": {
	id: "gi4c7fbeURc.mdx";
  slug: "gi4c7fbeurc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gmkdMTFg_kg.mdx": {
	id: "gmkdMTFg_kg.mdx";
  slug: "gmkdmtfg_kg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gtnDe_2YzFQ.mdx": {
	id: "gtnDe_2YzFQ.mdx";
  slug: "gtnde_2yzfq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gvMpY48kf2w.mdx": {
	id: "gvMpY48kf2w.mdx";
  slug: "gvmpy48kf2w";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"gwgmb00G_6g.mdx": {
	id: "gwgmb00G_6g.mdx";
  slug: "gwgmb00g_6g";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"hHXzchWLoqw.mdx": {
	id: "hHXzchWLoqw.mdx";
  slug: "hhxzchwloqw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"hn_L56ypX1A.mdx": {
	id: "hn_L56ypX1A.mdx";
  slug: "hn_l56ypx1a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"hr_y1hIdZHs.mdx": {
	id: "hr_y1hIdZHs.mdx";
  slug: "hr_y1hidzhs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"hsF5eiT6iOs.mdx": {
	id: "hsF5eiT6iOs.mdx";
  slug: "hsf5eit6ios";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"i8kner-Yrj0.mdx": {
	id: "i8kner-Yrj0.mdx";
  slug: "i8kner-yrj0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"iFEOdoHp19U.mdx": {
	id: "iFEOdoHp19U.mdx";
  slug: "ifeodohp19u";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"in80vPuCfro.mdx": {
	id: "in80vPuCfro.mdx";
  slug: "in80vpucfro";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"iwPGS-2kvSA.mdx": {
	id: "iwPGS-2kvSA.mdx";
  slug: "iwpgs-2kvsa";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ixCxoFAoOps.mdx": {
	id: "ixCxoFAoOps.mdx";
  slug: "ixcxofaoops";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"j8AVXNozac8.mdx": {
	id: "j8AVXNozac8.mdx";
  slug: "j8avxnozac8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"j8s01ThR7bQ.mdx": {
	id: "j8s01ThR7bQ.mdx";
  slug: "j8s01thr7bq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"j92fxPpFaL8.mdx": {
	id: "j92fxPpFaL8.mdx";
  slug: "j92fxppfal8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"jdzLpEnRAqg.mdx": {
	id: "jdzLpEnRAqg.mdx";
  slug: "jdzlpenraqg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"k42kEU2izKc.mdx": {
	id: "k42kEU2izKc.mdx";
  slug: "k42keu2izkc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kFnoD02gADs.mdx": {
	id: "kFnoD02gADs.mdx";
  slug: "kfnod02gads";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kHsTp2LENUI.mdx": {
	id: "kHsTp2LENUI.mdx";
  slug: "khstp2lenui";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kSXpwOElFY0.mdx": {
	id: "kSXpwOElFY0.mdx";
  slug: "ksxpwoelfy0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kdXKz1UWc3E.mdx": {
	id: "kdXKz1UWc3E.mdx";
  slug: "kdxkz1uwc3e";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kh27J3nI_oY.mdx": {
	id: "kh27J3nI_oY.mdx";
  slug: "kh27j3ni_oy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ki0Q9QeXH9Q.mdx": {
	id: "ki0Q9QeXH9Q.mdx";
  slug: "ki0q9qexh9q";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"kpHo_vKqcZk.mdx": {
	id: "kpHo_vKqcZk.mdx";
  slug: "kpho_vkqczk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ks0Fsn6Csa4.mdx": {
	id: "ks0Fsn6Csa4.mdx";
  slug: "ks0fsn6csa4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"l2jK0PBcawQ.mdx": {
	id: "l2jK0PBcawQ.mdx";
  slug: "l2jk0pbcawq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"lGEgtSETz9Y.mdx": {
	id: "lGEgtSETz9Y.mdx";
  slug: "lgegtsetz9y";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"lISvyIaSRyk.mdx": {
	id: "lISvyIaSRyk.mdx";
  slug: "lisvyiasryk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"lStfMBiWROQ.mdx": {
	id: "lStfMBiWROQ.mdx";
  slug: "lstfmbiwroq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"lgJmSQwQ-gk.mdx": {
	id: "lgJmSQwQ-gk.mdx";
  slug: "lgjmsqwq-gk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"li15G-SNjls.mdx": {
	id: "li15G-SNjls.mdx";
  slug: "li15g-snjls";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"m3YrZav5-CU.mdx": {
	id: "m3YrZav5-CU.mdx";
  slug: "m3yrzav5-cu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"mOA1SA9sfcw.mdx": {
	id: "mOA1SA9sfcw.mdx";
  slug: "moa1sa9sfcw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"mPU9cFn7SmI.mdx": {
	id: "mPU9cFn7SmI.mdx";
  slug: "mpu9cfn7smi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"md65iBX5Gxg.mdx": {
	id: "md65iBX5Gxg.mdx";
  slug: "md65ibx5gxg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"muCLu1-v_zA.mdx": {
	id: "muCLu1-v_zA.mdx";
  slug: "muclu1-v_za";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"mwBvr4H2cwU.mdx": {
	id: "mwBvr4H2cwU.mdx";
  slug: "mwbvr4h2cwu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"n5FK8_EXcbs.mdx": {
	id: "n5FK8_EXcbs.mdx";
  slug: "n5fk8_excbs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"n6ZQSq3f14M.mdx": {
	id: "n6ZQSq3f14M.mdx";
  slug: "n6zqsq3f14m";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nGZCL6Wd_zQ.mdx": {
	id: "nGZCL6Wd_zQ.mdx";
  slug: "ngzcl6wd_zq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nImE4P8Wc_M.mdx": {
	id: "nImE4P8Wc_M.mdx";
  slug: "nime4p8wc_m";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nMD4Q5ubX2A.mdx": {
	id: "nMD4Q5ubX2A.mdx";
  slug: "nmd4q5ubx2a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nMhD9IB9YJ8.mdx": {
	id: "nMhD9IB9YJ8.mdx";
  slug: "nmhd9ib9yj8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nOq1a6-8M-E.mdx": {
	id: "nOq1a6-8M-E.mdx";
  slug: "noq1a6-8m-e";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nR9K7JBXK20.mdx": {
	id: "nR9K7JBXK20.mdx";
  slug: "nr9k7jbxk20";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"njXeMeAu4Sg.mdx": {
	id: "njXeMeAu4Sg.mdx";
  slug: "njxemeau4sg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nkpPOVUHT1k.mdx": {
	id: "nkpPOVUHT1k.mdx";
  slug: "nkppovuht1k";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"nt5o1iMgPmA.mdx": {
	id: "nt5o1iMgPmA.mdx";
  slug: "nt5o1imgpma";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"o3JWb04DRIs.mdx": {
	id: "o3JWb04DRIs.mdx";
  slug: "o3jwb04dris";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"oAtlrDD7eFM.mdx": {
	id: "oAtlrDD7eFM.mdx";
  slug: "oatlrdd7efm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"oFdFexdzy30.mdx": {
	id: "oFdFexdzy30.mdx";
  slug: "ofdfexdzy30";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"oQUpcAnN8v0.mdx": {
	id: "oQUpcAnN8v0.mdx";
  slug: "oqupcann8v0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"p4XQeUaskeQ.mdx": {
	id: "p4XQeUaskeQ.mdx";
  slug: "p4xqeuaskeq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"pEGQ3UUeSEY.mdx": {
	id: "pEGQ3UUeSEY.mdx";
  slug: "pegq3uuesey";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"pGy5vrFJlH0.mdx": {
	id: "pGy5vrFJlH0.mdx";
  slug: "pgy5vrfjlh0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"pM5I2h7qjow.mdx": {
	id: "pM5I2h7qjow.mdx";
  slug: "pm5i2h7qjow";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"pSQjU3GB23E.mdx": {
	id: "pSQjU3GB23E.mdx";
  slug: "psqju3gb23e";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"qACBGbBxVYY.mdx": {
	id: "qACBGbBxVYY.mdx";
  slug: "qacbgbbxvyy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"qADQdrEKuJw.mdx": {
	id: "qADQdrEKuJw.mdx";
  slug: "qadqdrekujw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"qCX8rw4qOSA.mdx": {
	id: "qCX8rw4qOSA.mdx";
  slug: "qcx8rw4qosa";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"qO2qLZDVDCM.mdx": {
	id: "qO2qLZDVDCM.mdx";
  slug: "qo2qlzdvdcm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"qmdu9Kiw6UQ.mdx": {
	id: "qmdu9Kiw6UQ.mdx";
  slug: "qmdu9kiw6uq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"rWanEGMkXwc.mdx": {
	id: "rWanEGMkXwc.mdx";
  slug: "rwanegmkxwc";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"rY_XqfSHock.mdx": {
	id: "rY_XqfSHock.mdx";
  slug: "ry_xqfshock";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"raTvJzKoZJo.mdx": {
	id: "raTvJzKoZJo.mdx";
  slug: "ratvjzkozjo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"rgZkd-RAYfE.mdx": {
	id: "rgZkd-RAYfE.mdx";
  slug: "rgzkd-rayfe";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"rrI3Wi1XV5I.mdx": {
	id: "rrI3Wi1XV5I.mdx";
  slug: "rri3wi1xv5i";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"rvoum40FHAk.mdx": {
	id: "rvoum40FHAk.mdx";
  slug: "rvoum40fhak";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"s6nG0byDI-o.mdx": {
	id: "s6nG0byDI-o.mdx";
  slug: "s6ng0bydi-o";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"sQKTv4ulj_0.mdx": {
	id: "sQKTv4ulj_0.mdx";
  slug: "sqktv4ulj_0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"s_Fs4AXsTnA.mdx": {
	id: "s_Fs4AXsTnA.mdx";
  slug: "s_fs4axstna";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"sbiuZj2s5fs.mdx": {
	id: "sbiuZj2s5fs.mdx";
  slug: "sbiuzj2s5fs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"sf355K1iNjE.mdx": {
	id: "sf355K1iNjE.mdx";
  slug: "sf355k1inje";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"sndI4pxdB9U.mdx": {
	id: "sndI4pxdB9U.mdx";
  slug: "sndi4pxdb9u";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"sqTPGMipjHk.mdx": {
	id: "sqTPGMipjHk.mdx";
  slug: "sqtpgmipjhk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"t-nchkL9yIg.mdx": {
	id: "t-nchkL9yIg.mdx";
  slug: "t-nchkl9yig";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tD7DM99nH30.mdx": {
	id: "tD7DM99nH30.mdx";
  slug: "td7dm99nh30";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tFDvEITdJZ8.mdx": {
	id: "tFDvEITdJZ8.mdx";
  slug: "tfdveitdjz8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tGLwKqRCP_A.mdx": {
	id: "tGLwKqRCP_A.mdx";
  slug: "tglwkqrcp_a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tcNRdIqDnjY.mdx": {
	id: "tcNRdIqDnjY.mdx";
  slug: "tcnrdiqdnjy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tcZbY-Q0TIE.mdx": {
	id: "tcZbY-Q0TIE.mdx";
  slug: "tczby-q0tie";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tfr7ZIqNhq4.mdx": {
	id: "tfr7ZIqNhq4.mdx";
  slug: "tfr7ziqnhq4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tigwyK5Khck.mdx": {
	id: "tigwyK5Khck.mdx";
  slug: "tigwyk5khck";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tmfvqLFeR10.mdx": {
	id: "tmfvqLFeR10.mdx";
  slug: "tmfvqlfer10";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"tvp08g2W5dA.mdx": {
	id: "tvp08g2W5dA.mdx";
  slug: "tvp08g2w5da";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ufQcDD1kQCI.mdx": {
	id: "ufQcDD1kQCI.mdx";
  slug: "ufqcdd1kqci";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ukecIFE6Now.mdx": {
	id: "ukecIFE6Now.mdx";
  slug: "ukecife6now";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"v6OR7C304h4.mdx": {
	id: "v6OR7C304h4.mdx";
  slug: "v6or7c304h4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"vX6EXi5I9LE.mdx": {
	id: "vX6EXi5I9LE.mdx";
  slug: "vx6exi5i9le";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"vrZpGsL1-Ws.mdx": {
	id: "vrZpGsL1-Ws.mdx";
  slug: "vrzpgsl1-ws";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"vtM0-uhYLxM.mdx": {
	id: "vtM0-uhYLxM.mdx";
  slug: "vtm0-uhylxm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"vyJf8ch6-ZY.mdx": {
	id: "vyJf8ch6-ZY.mdx";
  slug: "vyjf8ch6-zy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"w58aZjACETQ.mdx": {
	id: "w58aZjACETQ.mdx";
  slug: "w58azjacetq";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wBQ2XDEKZw0.mdx": {
	id: "wBQ2XDEKZw0.mdx";
  slug: "wbq2xdekzw0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wU06eTMQ6yI.mdx": {
	id: "wU06eTMQ6yI.mdx";
  slug: "wu06etmq6yi";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wYTL1uqLXho.mdx": {
	id: "wYTL1uqLXho.mdx";
  slug: "wytl1uqlxho";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"weri7-a9Ytk.mdx": {
	id: "weri7-a9Ytk.mdx";
  slug: "weri7-a9ytk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wg6iqAdBF9A.mdx": {
	id: "wg6iqAdBF9A.mdx";
  slug: "wg6iqadbf9a";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wp1Rzv1uP10.mdx": {
	id: "wp1Rzv1uP10.mdx";
  slug: "wp1rzv1up10";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wtb1JRE-fgk.mdx": {
	id: "wtb1JRE-fgk.mdx";
  slug: "wtb1jre-fgk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wxnwPLLIJCY.mdx": {
	id: "wxnwPLLIJCY.mdx";
  slug: "wxnwpllijcy";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"wzRSYQ3b-Mk.mdx": {
	id: "wzRSYQ3b-Mk.mdx";
  slug: "wzrsyq3b-mk";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"x-aNifu9RNw.mdx": {
	id: "x-aNifu9RNw.mdx";
  slug: "x-anifu9rnw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"x22F4hSdZJM.mdx": {
	id: "x22F4hSdZJM.mdx";
  slug: "x22f4hsdzjm";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"x9usS4l1VD0.mdx": {
	id: "x9usS4l1VD0.mdx";
  slug: "x9uss4l1vd0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"xEWJwnQBqUo.mdx": {
	id: "xEWJwnQBqUo.mdx";
  slug: "xewjwnqbquo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"xdJQ1GtUQCg.mdx": {
	id: "xdJQ1GtUQCg.mdx";
  slug: "xdjq1gtuqcg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"xlTrDIHhnhs.mdx": {
	id: "xlTrDIHhnhs.mdx";
  slug: "xltrdihhnhs";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"xrbuvD5HBq4.mdx": {
	id: "xrbuvD5HBq4.mdx";
  slug: "xrbuvd5hbq4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"yFOq-V7Fb50.mdx": {
	id: "yFOq-V7Fb50.mdx";
  slug: "yfoq-v7fb50";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"yZDvE0mP4Y4.mdx": {
	id: "yZDvE0mP4Y4.mdx";
  slug: "yzdve0mp4y4";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"yZPGUHRUXVw.mdx": {
	id: "yZPGUHRUXVw.mdx";
  slug: "yzpguhruxvw";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"yi8UCnXPu8U.mdx": {
	id: "yi8UCnXPu8U.mdx";
  slug: "yi8ucnxpu8u";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"yo87SLp4jOo.mdx": {
	id: "yo87SLp4jOo.mdx";
  slug: "yo87slp4joo";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ypN-Uwshc5M.mdx": {
	id: "ypN-Uwshc5M.mdx";
  slug: "ypn-uwshc5m";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"ytXM05PVcFU.mdx": {
	id: "ytXM05PVcFU.mdx";
  slug: "ytxm05pvcfu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"z8lDwLKthr8.mdx": {
	id: "z8lDwLKthr8.mdx";
  slug: "z8ldwlkthr8";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zA6EDTErWUg.mdx": {
	id: "zA6EDTErWUg.mdx";
  slug: "za6edterwug";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zJ605k6ZYgA.mdx": {
	id: "zJ605k6ZYgA.mdx";
  slug: "zj605k6zyga";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zJvB2hnsXr0.mdx": {
	id: "zJvB2hnsXr0.mdx";
  slug: "zjvb2hnsxr0";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zM_ZiSl2n2E.mdx": {
	id: "zM_ZiSl2n2E.mdx";
  slug: "zm_zisl2n2e";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zYKsUJv4uiU.mdx": {
	id: "zYKsUJv4uiU.mdx";
  slug: "zyksujv4uiu";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
"zwQs4wXr9Bg.mdx": {
	id: "zwQs4wXr9Bg.mdx";
  slug: "zwqs4wxr9bg";
  body: string;
  collection: "videos";
  data: InferEntrySchema<"videos">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
