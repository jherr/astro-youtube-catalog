declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof (typeof entryMap)[C]>(
		collection: C,
		entryKey: E
	): Promise<(typeof entryMap)[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof (typeof entryMap)[C]
	>(
		collection: C,
		filter?: (data: (typeof entryMap)[C][E]) => boolean
	): Promise<((typeof entryMap)[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"roadmaps": {
"javascript.mdx": {
  id: "javascript.mdx",
  slug: "javascript",
  body: string,
  collection: "roadmaps",
  data: InferEntrySchema<"roadmaps">
},
"typescript.mdx": {
  id: "typescript.mdx",
  slug: "typescript",
  body: string,
  collection: "roadmaps",
  data: InferEntrySchema<"roadmaps">
},
},
"videos": {
"-1YhP5IOBCI.mdx": {
  id: "-1YhP5IOBCI.mdx",
  slug: "-1yhp5iobci",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"-TsIUuA3yyE.mdx": {
  id: "-TsIUuA3yyE.mdx",
  slug: "-tsiuua3yye",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"-urz6Sh7RE8.mdx": {
  id: "-urz6Sh7RE8.mdx",
  slug: "-urz6sh7re8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0-BsmzlMMIw.mdx": {
  id: "0-BsmzlMMIw.mdx",
  slug: "0-bsmzlmmiw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0W4SdogReDg.mdx": {
  id: "0W4SdogReDg.mdx",
  slug: "0w4sdogredg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0WIFW3s2fDM.mdx": {
  id: "0WIFW3s2fDM.mdx",
  slug: "0wifw3s2fdm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0eoyWYP6I4Q.mdx": {
  id: "0eoyWYP6I4Q.mdx",
  slug: "0eoywyp6i4q",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0nDGeQKLFjo.mdx": {
  id: "0nDGeQKLFjo.mdx",
  slug: "0ndgeqklfjo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"0vumsisnqwM.mdx": {
  id: "0vumsisnqwM.mdx",
  slug: "0vumsisnqwm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"10HkuC8H9m8.mdx": {
  id: "10HkuC8H9m8.mdx",
  slug: "10hkuc8h9m8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"1jlEEmiBSvI.mdx": {
  id: "1jlEEmiBSvI.mdx",
  slug: "1jleemibsvi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"1kFX3B2IyH0.mdx": {
  id: "1kFX3B2IyH0.mdx",
  slug: "1kfx3b2iyh0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"1x7mI_xuVVo.mdx": {
  id: "1x7mI_xuVVo.mdx",
  slug: "1x7mi_xuvvo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"1zCUMlFTDg0.mdx": {
  id: "1zCUMlFTDg0.mdx",
  slug: "1zcumlftdg0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"2DbX0xFL0nk.mdx": {
  id: "2DbX0xFL0nk.mdx",
  slug: "2dbx0xfl0nk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"2rrwPm8fuis.mdx": {
  id: "2rrwPm8fuis.mdx",
  slug: "2rrwpm8fuis",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"2tJedF8I-8Q.mdx": {
  id: "2tJedF8I-8Q.mdx",
  slug: "2tjedf8i-8q",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"432thqUKs-Y.mdx": {
  id: "432thqUKs-Y.mdx",
  slug: "432thquks-y",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"47wDMcPONAw.mdx": {
  id: "47wDMcPONAw.mdx",
  slug: "47wdmcponaw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"49IWKWOZthY.mdx": {
  id: "49IWKWOZthY.mdx",
  slug: "49iwkwozthy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4MmmlWwlST4.mdx": {
  id: "4MmmlWwlST4.mdx",
  slug: "4mmmlwwlst4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4PoNBZl4t0Y.mdx": {
  id: "4PoNBZl4t0Y.mdx",
  slug: "4ponbzl4t0y",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4U067O3_fYk.mdx": {
  id: "4U067O3_fYk.mdx",
  slug: "4u067o3_fyk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4XTj6sIGTdc.mdx": {
  id: "4XTj6sIGTdc.mdx",
  slug: "4xtj6sigtdc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4b9LSUZjtzE.mdx": {
  id: "4b9LSUZjtzE.mdx",
  slug: "4b9lsuzjtze",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4cbP95OcfR0.mdx": {
  id: "4cbP95OcfR0.mdx",
  slug: "4cbp95ocfr0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4wfqc7roa0Q.mdx": {
  id: "4wfqc7roa0Q.mdx",
  slug: "4wfqc7roa0q",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"4zRhgxctUYQ.mdx": {
  id: "4zRhgxctUYQ.mdx",
  slug: "4zrhgxctuyq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"56_OUG-0wgI.mdx": {
  id: "56_OUG-0wgI.mdx",
  slug: "56_oug-0wgi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"5WbpZlJCWNk.mdx": {
  id: "5WbpZlJCWNk.mdx",
  slug: "5wbpzljcwnk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"5lm5xJVqfmA.mdx": {
  id: "5lm5xJVqfmA.mdx",
  slug: "5lm5xjvqfma",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"5m7Al81Um88.mdx": {
  id: "5m7Al81Um88.mdx",
  slug: "5m7al81um88",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"5q0VtzJjvNc.mdx": {
  id: "5q0VtzJjvNc.mdx",
  slug: "5q0vtzjjvnc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"5zwzyHqBFnA.mdx": {
  id: "5zwzyHqBFnA.mdx",
  slug: "5zwzyhqbfna",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"6yBv-_COJkk.mdx": {
  id: "6yBv-_COJkk.mdx",
  slug: "6ybv-_cojkk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"7I-CY1a-Jpk.mdx": {
  id: "7I-CY1a-Jpk.mdx",
  slug: "7i-cy1a-jpk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"7kNLXE0hixM.mdx": {
  id: "7kNLXE0hixM.mdx",
  slug: "7knlxe0hixm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"7ldI5jBsmlI.mdx": {
  id: "7ldI5jBsmlI.mdx",
  slug: "7ldi5jbsmli",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"7o1P-SB7yQw.mdx": {
  id: "7o1P-SB7yQw.mdx",
  slug: "7o1p-sb7yqw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"87hg99a9cjE.mdx": {
  id: "87hg99a9cjE.mdx",
  slug: "87hg99a9cje",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"8M5rpG9TD-c.mdx": {
  id: "8M5rpG9TD-c.mdx",
  slug: "8m5rpg9td-c",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"8QtiqXew2QQ.mdx": {
  id: "8QtiqXew2QQ.mdx",
  slug: "8qtiqxew2qq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"9y0eY6hs1QM.mdx": {
  id: "9y0eY6hs1QM.mdx",
  slug: "9y0ey6hs1qm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"AU7dKWNfWiA.mdx": {
  id: "AU7dKWNfWiA.mdx",
  slug: "au7dkwnfwia",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"AknVkHeYqqg.mdx": {
  id: "AknVkHeYqqg.mdx",
  slug: "aknvkheyqqg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"BdzFpyGVfVI.mdx": {
  id: "BdzFpyGVfVI.mdx",
  slug: "bdzfpygvfvi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"BtIlaOuN18c.mdx": {
  id: "BtIlaOuN18c.mdx",
  slug: "btilaoun18c",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Bw_tmWEaaIU.mdx": {
  id: "Bw_tmWEaaIU.mdx",
  slug: "bw_tmweaaiu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"CO7vEjsw3cc.mdx": {
  id: "CO7vEjsw3cc.mdx",
  slug: "co7vejsw3cc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"CZMXRMdHm34.mdx": {
  id: "CZMXRMdHm34.mdx",
  slug: "czmxrmdhm34",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"CkHR0OXTYXI.mdx": {
  id: "CkHR0OXTYXI.mdx",
  slug: "ckhr0oxtyxi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Cos-ctPX5hw.mdx": {
  id: "Cos-ctPX5hw.mdx",
  slug: "cos-ctpx5hw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"D3PuSLokPZg.mdx": {
  id: "D3PuSLokPZg.mdx",
  slug: "d3puslokpzg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"D3XYAx30CNc.mdx": {
  id: "D3XYAx30CNc.mdx",
  slug: "d3xyax30cnc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"DEPwA3mv_R8.mdx": {
  id: "DEPwA3mv_R8.mdx",
  slug: "depwa3mv_r8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"DHjZnJRK_S8.mdx": {
  id: "DHjZnJRK_S8.mdx",
  slug: "dhjznjrk_s8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"DM6CgUFyXxw.mdx": {
  id: "DM6CgUFyXxw.mdx",
  slug: "dm6cgufyxxw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"DjzlGfhUyAM.mdx": {
  id: "DjzlGfhUyAM.mdx",
  slug: "djzlgfhuyam",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"DxG17pbgsZg.mdx": {
  id: "DxG17pbgsZg.mdx",
  slug: "dxg17pbgszg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"EFVCTzqRbqo.mdx": {
  id: "EFVCTzqRbqo.mdx",
  slug: "efvctzqrbqo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"EH9Suo_J4Ks.mdx": {
  id: "EH9Suo_J4Ks.mdx",
  slug: "eh9suo_j4ks",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"EXI9v6i7bAo.mdx": {
  id: "EXI9v6i7bAo.mdx",
  slug: "exi9v6i7bao",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"EzJF0IUoYhQ.mdx": {
  id: "EzJF0IUoYhQ.mdx",
  slug: "ezjf0iuoyhq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"F-0SZ_TicXA.mdx": {
  id: "F-0SZ_TicXA.mdx",
  slug: "f-0sz_ticxa",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"FC5gM49xQPE.mdx": {
  id: "FC5gM49xQPE.mdx",
  slug: "fc5gm49xqpe",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"FFu0-9hGyX4.mdx": {
  id: "FFu0-9hGyX4.mdx",
  slug: "ffu0-9hgyx4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"FTGWIH4RlHg.mdx": {
  id: "FTGWIH4RlHg.mdx",
  slug: "ftgwih4rlhg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"FmGYLJlhXco.mdx": {
  id: "FmGYLJlhXco.mdx",
  slug: "fmgyljlhxco",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"FrLzKMWa3Gk.mdx": {
  id: "FrLzKMWa3Gk.mdx",
  slug: "frlzkmwa3gk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"G1gyXbLdRzc.mdx": {
  id: "G1gyXbLdRzc.mdx",
  slug: "g1gyxbldrzc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"GBAO3YKMonI.mdx": {
  id: "GBAO3YKMonI.mdx",
  slug: "gbao3ykmoni",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"GMeQ51MCegI.mdx": {
  id: "GMeQ51MCegI.mdx",
  slug: "gmeq51mcegi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"GjkQS5J6K6k.mdx": {
  id: "GjkQS5J6K6k.mdx",
  slug: "gjkqs5j6k6k",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"GkUFmlVs-No.mdx": {
  id: "GkUFmlVs-No.mdx",
  slug: "gkufmlvs-no",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"GsRnExrC89A.mdx": {
  id: "GsRnExrC89A.mdx",
  slug: "gsrnexrc89a",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"H2kxc_ZrSPI.mdx": {
  id: "H2kxc_ZrSPI.mdx",
  slug: "h2kxc_zrspi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"HUVawJXeHfU.mdx": {
  id: "HUVawJXeHfU.mdx",
  slug: "huvawjxehfu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"HbSvuxr2kzA.mdx": {
  id: "HbSvuxr2kzA.mdx",
  slug: "hbsvuxr2kza",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Hsk5tM_N420.mdx": {
  id: "Hsk5tM_N420.mdx",
  slug: "hsk5tm_n420",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"HwNArS3f1Ss.mdx": {
  id: "HwNArS3f1Ss.mdx",
  slug: "hwnars3f1ss",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"HxyaftP6hJ8.mdx": {
  id: "HxyaftP6hJ8.mdx",
  slug: "hxyaftp6hj8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ICeH3uBGGeo.mdx": {
  id: "ICeH3uBGGeo.mdx",
  slug: "iceh3ubggeo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ILbRI4m2D9Y.mdx": {
  id: "ILbRI4m2D9Y.mdx",
  slug: "ilbri4m2d9y",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ITVS76JpNn8.mdx": {
  id: "ITVS76JpNn8.mdx",
  slug: "itvs76jpnn8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"J-M11cC_NL4.mdx": {
  id: "J-M11cC_NL4.mdx",
  slug: "j-m11cc_nl4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"J81MS6H1NBQ.mdx": {
  id: "J81MS6H1NBQ.mdx",
  slug: "j81ms6h1nbq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"JBu2ZTPgiKI.mdx": {
  id: "JBu2ZTPgiKI.mdx",
  slug: "jbu2ztpgiki",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"JKj-J83Qop0.mdx": {
  id: "JKj-J83Qop0.mdx",
  slug: "jkj-j83qop0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"JaM2rExmmqs.mdx": {
  id: "JaM2rExmmqs.mdx",
  slug: "jam2rexmmqs",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"JauJhGTBFsc.mdx": {
  id: "JauJhGTBFsc.mdx",
  slug: "jaujhgtbfsc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"K-yQB9YGmgE.mdx": {
  id: "K-yQB9YGmgE.mdx",
  slug: "k-yqb9ygmge",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"KBoNbQPQwwQ.mdx": {
  id: "KBoNbQPQwwQ.mdx",
  slug: "kbonbqpqwwq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"KBwhyxWGFsE.mdx": {
  id: "KBwhyxWGFsE.mdx",
  slug: "kbwhyxwgfse",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"KEc0LLQjyfQ.mdx": {
  id: "KEc0LLQjyfQ.mdx",
  slug: "kec0llqjyfq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Kn8TKLcd6d4.mdx": {
  id: "Kn8TKLcd6d4.mdx",
  slug: "kn8tklcd6d4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LAu1p6tmj_Y.mdx": {
  id: "LAu1p6tmj_Y.mdx",
  slug: "lau1p6tmj_y",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LDS1ll93P-s.mdx": {
  id: "LDS1ll93P-s.mdx",
  slug: "lds1ll93p-s",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LKVHFHJsiO0.mdx": {
  id: "LKVHFHJsiO0.mdx",
  slug: "lkvhfhjsio0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LZc2hSghezM.mdx": {
  id: "LZc2hSghezM.mdx",
  slug: "lzc2hsghezm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Lam0cYOEst8.mdx": {
  id: "Lam0cYOEst8.mdx",
  slug: "lam0cyoest8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LsvZM7ihXQI.mdx": {
  id: "LsvZM7ihXQI.mdx",
  slug: "lsvzm7ihxqi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"LyS1bB96FDg.mdx": {
  id: "LyS1bB96FDg.mdx",
  slug: "lys1bb96fdg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MJaGti42c5c.mdx": {
  id: "MJaGti42c5c.mdx",
  slug: "mjagti42c5c",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MLLALr3ctoE.mdx": {
  id: "MLLALr3ctoE.mdx",
  slug: "mllalr3ctoe",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MU8_LP8R_ZI.mdx": {
  id: "MU8_LP8R_ZI.mdx",
  slug: "mu8_lp8r_zi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Mi6sosJuDDY.mdx": {
  id: "Mi6sosJuDDY.mdx",
  slug: "mi6sosjuddy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MkNCkKomu_s.mdx": {
  id: "MkNCkKomu_s.mdx",
  slug: "mknckkomu_s",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MlDTHzK1vKI.mdx": {
  id: "MlDTHzK1vKI.mdx",
  slug: "mldthzk1vki",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"MpdFj8MEuJA.mdx": {
  id: "MpdFj8MEuJA.mdx",
  slug: "mpdfj8meuja",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"NCSkAUP3Nv0.mdx": {
  id: "NCSkAUP3Nv0.mdx",
  slug: "ncskaup3nv0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"NGqoq5D_rEE.mdx": {
  id: "NGqoq5D_rEE.mdx",
  slug: "ngqoq5d_ree",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"NJxagi7K-D8.mdx": {
  id: "NJxagi7K-D8.mdx",
  slug: "njxagi7k-d8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"NaJI7RkSPx8.mdx": {
  id: "NaJI7RkSPx8.mdx",
  slug: "naji7rkspx8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"NgkYH97Z3nk.mdx": {
  id: "NgkYH97Z3nk.mdx",
  slug: "ngkyh97z3nk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"OCg4DJyVGk0.mdx": {
  id: "OCg4DJyVGk0.mdx",
  slug: "ocg4djyvgk0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"OpMAH2hzKi8.mdx": {
  id: "OpMAH2hzKi8.mdx",
  slug: "opmah2hzki8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"OqcHoLWyyIw.mdx": {
  id: "OqcHoLWyyIw.mdx",
  slug: "oqcholwyyiw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"OseG8oQ2RDM.mdx": {
  id: "OseG8oQ2RDM.mdx",
  slug: "oseg8oq2rdm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"P0GxuOPyLXo.mdx": {
  id: "P0GxuOPyLXo.mdx",
  slug: "p0gxuopylxo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"P95DuIBwnqw.mdx": {
  id: "P95DuIBwnqw.mdx",
  slug: "p95duibwnqw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"PSzCtdM20Fc.mdx": {
  id: "PSzCtdM20Fc.mdx",
  slug: "pszctdm20fc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"P_5Yxktq9Rs.mdx": {
  id: "P_5Yxktq9Rs.mdx",
  slug: "p_5yxktq9rs",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"PbswZshAKF8.mdx": {
  id: "PbswZshAKF8.mdx",
  slug: "pbswzshakf8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Q4QDyr0jLfo.mdx": {
  id: "Q4QDyr0jLfo.mdx",
  slug: "q4qdyr0jlfo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Q4dos7-gX68.mdx": {
  id: "Q4dos7-gX68.mdx",
  slug: "q4dos7-gx68",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"QChEaOHauZY.mdx": {
  id: "QChEaOHauZY.mdx",
  slug: "qcheaohauzy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Qs7NkP6TJn8.mdx": {
  id: "Qs7NkP6TJn8.mdx",
  slug: "qs7nkp6tjn8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"QuLfCUh-iwI.mdx": {
  id: "QuLfCUh-iwI.mdx",
  slug: "qulfcuh-iwi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"QvcyL_ZGhf0.mdx": {
  id: "QvcyL_ZGhf0.mdx",
  slug: "qvcyl_zghf0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"RAJD4KpX8LA.mdx": {
  id: "RAJD4KpX8LA.mdx",
  slug: "rajd4kpx8la",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"RCgJQq_pDfg.mdx": {
  id: "RCgJQq_pDfg.mdx",
  slug: "rcgjqq_pdfg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"RonRwypIVaw.mdx": {
  id: "RonRwypIVaw.mdx",
  slug: "ronrwypivaw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"S2L4fatK0Ek.mdx": {
  id: "S2L4fatK0Ek.mdx",
  slug: "s2l4fatk0ek",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"S6Tu8oXyoRk.mdx": {
  id: "S6Tu8oXyoRk.mdx",
  slug: "s6tu8oxyork",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"SBysJEnvvhQ.mdx": {
  id: "SBysJEnvvhQ.mdx",
  slug: "sbysjenvvhq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"SZ2kAkMdAZE.mdx": {
  id: "SZ2kAkMdAZE.mdx",
  slug: "sz2kakmdaze",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Sti_XBFn5Xw.mdx": {
  id: "Sti_XBFn5Xw.mdx",
  slug: "sti_xbfn5xw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"UbEx1v26kCs.mdx": {
  id: "UbEx1v26kCs.mdx",
  slug: "ubex1v26kcs",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"VAIR7cRBlFw.mdx": {
  id: "VAIR7cRBlFw.mdx",
  slug: "vair7crblfw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"VBbkLd-_dPU.mdx": {
  id: "VBbkLd-_dPU.mdx",
  slug: "vbbkld-_dpu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"VcOMq3LQtBU.mdx": {
  id: "VcOMq3LQtBU.mdx",
  slug: "vcomq3lqtbu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"VrfJeXj7TiQ.mdx": {
  id: "VrfJeXj7TiQ.mdx",
  slug: "vrfjexj7tiq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"W0RbrAZtj7I.mdx": {
  id: "W0RbrAZtj7I.mdx",
  slug: "w0rbraztj7i",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"W5TXxJIyBP0.mdx": {
  id: "W5TXxJIyBP0.mdx",
  slug: "w5txxjiybp0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"WOfL5q2HznI.mdx": {
  id: "WOfL5q2HznI.mdx",
  slug: "wofl5q2hzni",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"XYq9QpgAx8g.mdx": {
  id: "XYq9QpgAx8g.mdx",
  slug: "xyq9qpgax8g",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"XnlECbwcJZ0.mdx": {
  id: "XnlECbwcJZ0.mdx",
  slug: "xnlecbwcjz0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"XnyZXNnWAOA.mdx": {
  id: "XnyZXNnWAOA.mdx",
  slug: "xnyzxnnwaoa",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Xt1dNdJpgw4.mdx": {
  id: "Xt1dNdJpgw4.mdx",
  slug: "xt1dndjpgw4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"Xw9XMNn2k0o.mdx": {
  id: "Xw9XMNn2k0o.mdx",
  slug: "xw9xmnn2k0o",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"XzE-PzALyDc.mdx": {
  id: "XzE-PzALyDc.mdx",
  slug: "xze-pzalydc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"YQvQwTAqXE8.mdx": {
  id: "YQvQwTAqXE8.mdx",
  slug: "yqvqwtaqxe8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"YzPDzWM_k_8.mdx": {
  id: "YzPDzWM_k_8.mdx",
  slug: "yzpdzwm_k_8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ZD7viwwRLAw.mdx": {
  id: "ZD7viwwRLAw.mdx",
  slug: "zd7viwwrlaw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ZFNxTy3fOO0.mdx": {
  id: "ZFNxTy3fOO0.mdx",
  slug: "zfnxty3foo0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ZG3xZP0SXYs.mdx": {
  id: "ZG3xZP0SXYs.mdx",
  slug: "zg3xzp0sxys",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ZKlXqrcBx88.mdx": {
  id: "ZKlXqrcBx88.mdx",
  slug: "zklxqrcbx88",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_Tr9ZcXcMjQ.mdx": {
  id: "_Tr9ZcXcMjQ.mdx",
  slug: "_tr9zcxcmjq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_VItRGUFyKU.mdx": {
  id: "_VItRGUFyKU.mdx",
  slug: "_vitrgufyku",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_WpzQTHBRLE.mdx": {
  id: "_WpzQTHBRLE.mdx",
  slug: "_wpzqthbrle",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_ZQSPYDlk3U.mdx": {
  id: "_ZQSPYDlk3U.mdx",
  slug: "_zqspydlk3u",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_ZnNZWlyw7M.mdx": {
  id: "_ZnNZWlyw7M.mdx",
  slug: "_znnzwlyw7m",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_cbJ2iN25_I.mdx": {
  id: "_cbJ2iN25_I.mdx",
  slug: "_cbj2in25_i",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_gRxCvDjWjs.mdx": {
  id: "_gRxCvDjWjs.mdx",
  slug: "_grxcvdjwjs",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_m2XfYzBV2c.mdx": {
  id: "_m2XfYzBV2c.mdx",
  slug: "_m2xfyzbv2c",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"_qCRuFrdhYw.mdx": {
  id: "_qCRuFrdhYw.mdx",
  slug: "_qcrufrdhyw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"aDqGIhl7cdo.mdx": {
  id: "aDqGIhl7cdo.mdx",
  slug: "adqgihl7cdo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"aHA581Mp2Mo.mdx": {
  id: "aHA581Mp2Mo.mdx",
  slug: "aha581mp2mo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"aM1bxz-82Qw.mdx": {
  id: "aM1bxz-82Qw.mdx",
  slug: "am1bxz-82qw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"aOt4Hz3ze3Q.mdx": {
  id: "aOt4Hz3ze3Q.mdx",
  slug: "aot4hz3ze3q",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"apg9XR35pAM.mdx": {
  id: "apg9XR35pAM.mdx",
  slug: "apg9xr35pam",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"b-Eo2v0EzFw.mdx": {
  id: "b-Eo2v0EzFw.mdx",
  slug: "b-eo2v0ezfw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"bCU9BUfwUJE.mdx": {
  id: "bCU9BUfwUJE.mdx",
  slug: "bcu9bufwuje",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"bLyl4VDNPyY.mdx": {
  id: "bLyl4VDNPyY.mdx",
  slug: "blyl4vdnpyy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"b_p3yP57A9w.mdx": {
  id: "b_p3yP57A9w.mdx",
  slug: "b_p3yp57a9w",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"bk5JvHGFv3A.mdx": {
  id: "bk5JvHGFv3A.mdx",
  slug: "bk5jvhgfv3a",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"bmKDT-yG2eE.mdx": {
  id: "bmKDT-yG2eE.mdx",
  slug: "bmkdt-yg2ee",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"bvdHVxqjv80.mdx": {
  id: "bvdHVxqjv80.mdx",
  slug: "bvdhvxqjv80",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"cHUAvVkOBvY.mdx": {
  id: "cHUAvVkOBvY.mdx",
  slug: "chuavvkobvy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"cpG5W4uyqz0.mdx": {
  id: "cpG5W4uyqz0.mdx",
  slug: "cpg5w4uyqz0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"d58QLA2bnug.mdx": {
  id: "d58QLA2bnug.mdx",
  slug: "d58qla2bnug",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"dH6i3GurZW8.mdx": {
  id: "dH6i3GurZW8.mdx",
  slug: "dh6i3gurzw8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"dMkYWwYmJB8.mdx": {
  id: "dMkYWwYmJB8.mdx",
  slug: "dmkywwymjb8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"e8Aqtak8stI.mdx": {
  id: "e8Aqtak8stI.mdx",
  slug: "e8aqtak8sti",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"eAfUfKYcvBo.mdx": {
  id: "eAfUfKYcvBo.mdx",
  slug: "eafufkycvbo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"eFh2Kr9hfyo.mdx": {
  id: "eFh2Kr9hfyo.mdx",
  slug: "efh2kr9hfyo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"eQE9wp4PTY4.mdx": {
  id: "eQE9wp4PTY4.mdx",
  slug: "eqe9wp4pty4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"eVfw4pRDUIY.mdx": {
  id: "eVfw4pRDUIY.mdx",
  slug: "evfw4prduiy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ekIDdZE7YjM.mdx": {
  id: "ekIDdZE7YjM.mdx",
  slug: "ekiddze7yjm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"emhwHjAsyss.mdx": {
  id: "emhwHjAsyss.mdx",
  slug: "emhwhjasyss",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"erfWjBNDdOE.mdx": {
  id: "erfWjBNDdOE.mdx",
  slug: "erfwjbnddoe",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"f3Cn0CGytSQ.mdx": {
  id: "f3Cn0CGytSQ.mdx",
  slug: "f3cn0cgytsq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"fu10QR3IU-k.mdx": {
  id: "fu10QR3IU-k.mdx",
  slug: "fu10qr3iu-k",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"g1LtqLVKgIA.mdx": {
  id: "g1LtqLVKgIA.mdx",
  slug: "g1ltqlvkgia",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"gChqkchbn9o.mdx": {
  id: "gChqkchbn9o.mdx",
  slug: "gchqkchbn9o",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"gED6KGBQgak.mdx": {
  id: "gED6KGBQgak.mdx",
  slug: "ged6kgbqgak",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"gtnDe_2YzFQ.mdx": {
  id: "gtnDe_2YzFQ.mdx",
  slug: "gtnde_2yzfq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"hHXzchWLoqw.mdx": {
  id: "hHXzchWLoqw.mdx",
  slug: "hhxzchwloqw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"i8kner-Yrj0.mdx": {
  id: "i8kner-Yrj0.mdx",
  slug: "i8kner-yrj0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"iFEOdoHp19U.mdx": {
  id: "iFEOdoHp19U.mdx",
  slug: "ifeodohp19u",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"in80vPuCfro.mdx": {
  id: "in80vPuCfro.mdx",
  slug: "in80vpucfro",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"iwPGS-2kvSA.mdx": {
  id: "iwPGS-2kvSA.mdx",
  slug: "iwpgs-2kvsa",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ixCxoFAoOps.mdx": {
  id: "ixCxoFAoOps.mdx",
  slug: "ixcxofaoops",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"j8AVXNozac8.mdx": {
  id: "j8AVXNozac8.mdx",
  slug: "j8avxnozac8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"j8s01ThR7bQ.mdx": {
  id: "j8s01ThR7bQ.mdx",
  slug: "j8s01thr7bq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"j92fxPpFaL8.mdx": {
  id: "j92fxPpFaL8.mdx",
  slug: "j92fxppfal8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"jdzLpEnRAqg.mdx": {
  id: "jdzLpEnRAqg.mdx",
  slug: "jdzlpenraqg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"k42kEU2izKc.mdx": {
  id: "k42kEU2izKc.mdx",
  slug: "k42keu2izkc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"kSXpwOElFY0.mdx": {
  id: "kSXpwOElFY0.mdx",
  slug: "ksxpwoelfy0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"kdXKz1UWc3E.mdx": {
  id: "kdXKz1UWc3E.mdx",
  slug: "kdxkz1uwc3e",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"kh27J3nI_oY.mdx": {
  id: "kh27J3nI_oY.mdx",
  slug: "kh27j3ni_oy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ki0Q9QeXH9Q.mdx": {
  id: "ki0Q9QeXH9Q.mdx",
  slug: "ki0q9qexh9q",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ks0Fsn6Csa4.mdx": {
  id: "ks0Fsn6Csa4.mdx",
  slug: "ks0fsn6csa4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"lGEgtSETz9Y.mdx": {
  id: "lGEgtSETz9Y.mdx",
  slug: "lgegtsetz9y",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"lStfMBiWROQ.mdx": {
  id: "lStfMBiWROQ.mdx",
  slug: "lstfmbiwroq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"lgJmSQwQ-gk.mdx": {
  id: "lgJmSQwQ-gk.mdx",
  slug: "lgjmsqwq-gk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"li15G-SNjls.mdx": {
  id: "li15G-SNjls.mdx",
  slug: "li15g-snjls",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"m3YrZav5-CU.mdx": {
  id: "m3YrZav5-CU.mdx",
  slug: "m3yrzav5-cu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"mOA1SA9sfcw.mdx": {
  id: "mOA1SA9sfcw.mdx",
  slug: "moa1sa9sfcw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"mPU9cFn7SmI.mdx": {
  id: "mPU9cFn7SmI.mdx",
  slug: "mpu9cfn7smi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"muCLu1-v_zA.mdx": {
  id: "muCLu1-v_zA.mdx",
  slug: "muclu1-v_za",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"n6ZQSq3f14M.mdx": {
  id: "n6ZQSq3f14M.mdx",
  slug: "n6zqsq3f14m",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"nGZCL6Wd_zQ.mdx": {
  id: "nGZCL6Wd_zQ.mdx",
  slug: "ngzcl6wd_zq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"nImE4P8Wc_M.mdx": {
  id: "nImE4P8Wc_M.mdx",
  slug: "nime4p8wc_m",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"nMhD9IB9YJ8.mdx": {
  id: "nMhD9IB9YJ8.mdx",
  slug: "nmhd9ib9yj8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"nOq1a6-8M-E.mdx": {
  id: "nOq1a6-8M-E.mdx",
  slug: "noq1a6-8m-e",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"njXeMeAu4Sg.mdx": {
  id: "njXeMeAu4Sg.mdx",
  slug: "njxemeau4sg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"nkpPOVUHT1k.mdx": {
  id: "nkpPOVUHT1k.mdx",
  slug: "nkppovuht1k",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"o3JWb04DRIs.mdx": {
  id: "o3JWb04DRIs.mdx",
  slug: "o3jwb04dris",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"oAtlrDD7eFM.mdx": {
  id: "oAtlrDD7eFM.mdx",
  slug: "oatlrdd7efm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"oQUpcAnN8v0.mdx": {
  id: "oQUpcAnN8v0.mdx",
  slug: "oqupcann8v0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"p4XQeUaskeQ.mdx": {
  id: "p4XQeUaskeQ.mdx",
  slug: "p4xqeuaskeq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"pGy5vrFJlH0.mdx": {
  id: "pGy5vrFJlH0.mdx",
  slug: "pgy5vrfjlh0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"pM5I2h7qjow.mdx": {
  id: "pM5I2h7qjow.mdx",
  slug: "pm5i2h7qjow",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"qACBGbBxVYY.mdx": {
  id: "qACBGbBxVYY.mdx",
  slug: "qacbgbbxvyy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"qCX8rw4qOSA.mdx": {
  id: "qCX8rw4qOSA.mdx",
  slug: "qcx8rw4qosa",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"rWanEGMkXwc.mdx": {
  id: "rWanEGMkXwc.mdx",
  slug: "rwanegmkxwc",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"rY_XqfSHock.mdx": {
  id: "rY_XqfSHock.mdx",
  slug: "ry_xqfshock",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"raTvJzKoZJo.mdx": {
  id: "raTvJzKoZJo.mdx",
  slug: "ratvjzkozjo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"rgZkd-RAYfE.mdx": {
  id: "rgZkd-RAYfE.mdx",
  slug: "rgzkd-rayfe",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"s6nG0byDI-o.mdx": {
  id: "s6nG0byDI-o.mdx",
  slug: "s6ng0bydi-o",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"s_Fs4AXsTnA.mdx": {
  id: "s_Fs4AXsTnA.mdx",
  slug: "s_fs4axstna",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"sf355K1iNjE.mdx": {
  id: "sf355K1iNjE.mdx",
  slug: "sf355k1inje",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"sndI4pxdB9U.mdx": {
  id: "sndI4pxdB9U.mdx",
  slug: "sndi4pxdb9u",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"sqTPGMipjHk.mdx": {
  id: "sqTPGMipjHk.mdx",
  slug: "sqtpgmipjhk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tD7DM99nH30.mdx": {
  id: "tD7DM99nH30.mdx",
  slug: "td7dm99nh30",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tFDvEITdJZ8.mdx": {
  id: "tFDvEITdJZ8.mdx",
  slug: "tfdveitdjz8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tGLwKqRCP_A.mdx": {
  id: "tGLwKqRCP_A.mdx",
  slug: "tglwkqrcp_a",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tcNRdIqDnjY.mdx": {
  id: "tcNRdIqDnjY.mdx",
  slug: "tcnrdiqdnjy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tcZbY-Q0TIE.mdx": {
  id: "tcZbY-Q0TIE.mdx",
  slug: "tczby-q0tie",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tfr7ZIqNhq4.mdx": {
  id: "tfr7ZIqNhq4.mdx",
  slug: "tfr7ziqnhq4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tigwyK5Khck.mdx": {
  id: "tigwyK5Khck.mdx",
  slug: "tigwyk5khck",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"tmfvqLFeR10.mdx": {
  id: "tmfvqLFeR10.mdx",
  slug: "tmfvqlfer10",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ufQcDD1kQCI.mdx": {
  id: "ufQcDD1kQCI.mdx",
  slug: "ufqcdd1kqci",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ukecIFE6Now.mdx": {
  id: "ukecIFE6Now.mdx",
  slug: "ukecife6now",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"v6OR7C304h4.mdx": {
  id: "v6OR7C304h4.mdx",
  slug: "v6or7c304h4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"vX6EXi5I9LE.mdx": {
  id: "vX6EXi5I9LE.mdx",
  slug: "vx6exi5i9le",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"vrZpGsL1-Ws.mdx": {
  id: "vrZpGsL1-Ws.mdx",
  slug: "vrzpgsl1-ws",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"vtM0-uhYLxM.mdx": {
  id: "vtM0-uhYLxM.mdx",
  slug: "vtm0-uhylxm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"w58aZjACETQ.mdx": {
  id: "w58aZjACETQ.mdx",
  slug: "w58azjacetq",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"wU06eTMQ6yI.mdx": {
  id: "wU06eTMQ6yI.mdx",
  slug: "wu06etmq6yi",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"wYTL1uqLXho.mdx": {
  id: "wYTL1uqLXho.mdx",
  slug: "wytl1uqlxho",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"wg6iqAdBF9A.mdx": {
  id: "wg6iqAdBF9A.mdx",
  slug: "wg6iqadbf9a",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"wtb1JRE-fgk.mdx": {
  id: "wtb1JRE-fgk.mdx",
  slug: "wtb1jre-fgk",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"wxnwPLLIJCY.mdx": {
  id: "wxnwPLLIJCY.mdx",
  slug: "wxnwpllijcy",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"x22F4hSdZJM.mdx": {
  id: "x22F4hSdZJM.mdx",
  slug: "x22f4hsdzjm",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"x9usS4l1VD0.mdx": {
  id: "x9usS4l1VD0.mdx",
  slug: "x9uss4l1vd0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"xdJQ1GtUQCg.mdx": {
  id: "xdJQ1GtUQCg.mdx",
  slug: "xdjq1gtuqcg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"xrbuvD5HBq4.mdx": {
  id: "xrbuvD5HBq4.mdx",
  slug: "xrbuvd5hbq4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"yZDvE0mP4Y4.mdx": {
  id: "yZDvE0mP4Y4.mdx",
  slug: "yzdve0mp4y4",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"yZPGUHRUXVw.mdx": {
  id: "yZPGUHRUXVw.mdx",
  slug: "yzpguhruxvw",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"yo87SLp4jOo.mdx": {
  id: "yo87SLp4jOo.mdx",
  slug: "yo87slp4joo",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ypN-Uwshc5M.mdx": {
  id: "ypN-Uwshc5M.mdx",
  slug: "ypn-uwshc5m",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"ytXM05PVcFU.mdx": {
  id: "ytXM05PVcFU.mdx",
  slug: "ytxm05pvcfu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"z8lDwLKthr8.mdx": {
  id: "z8lDwLKthr8.mdx",
  slug: "z8ldwlkthr8",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"zA6EDTErWUg.mdx": {
  id: "zA6EDTErWUg.mdx",
  slug: "za6edterwug",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"zJvB2hnsXr0.mdx": {
  id: "zJvB2hnsXr0.mdx",
  slug: "zjvb2hnsxr0",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"zM_ZiSl2n2E.mdx": {
  id: "zM_ZiSl2n2E.mdx",
  slug: "zm_zisl2n2e",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"zYKsUJv4uiU.mdx": {
  id: "zYKsUJv4uiU.mdx",
  slug: "zyksujv4uiu",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
"zwQs4wXr9Bg.mdx": {
  id: "zwQs4wXr9Bg.mdx",
  slug: "zwqs4wxr9bg",
  body: string,
  collection: "videos",
  data: InferEntrySchema<"videos">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
