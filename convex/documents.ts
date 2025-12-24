import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

export const create = mutation({
	args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError('Unauthorized');
		}

		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		return await ctx.db.insert('documents', {
			title: args.title ?? 'Untitled Document',
			ownerId: user.subject,
			organizationId,
			initialContent: args.initialContent,
		});
	},
});

export const get = query({
	args: {
		paginationOpts: paginationOptsValidator,
		search: v.optional(v.string()),
	},
	handler: async (ctx, { search, paginationOpts }) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError('Unauthorized');
		}

		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		if (search && organizationId) {
			return await ctx.db
				.query('documents')
				.withSearchIndex('search_title', q => {
					return q.search('title', search).eq('organizationId', organizationId);
				})
				.paginate(paginationOpts);
		}
		if (search) {
			return await ctx.db
				.query('documents')
				.withSearchIndex('search_title', q => {
					return q.search('title', search).eq('ownerId', user.subject);
				})
				.paginate(paginationOpts);
		}

		if (organizationId) {
			return await ctx.db
				.query('documents')
				.withIndex('by_organization_id', q => q.eq('organizationId', organizationId))
				.paginate(paginationOpts);
		}

		return await ctx.db
			.query('documents')
			.withIndex('by_owner_id', q => q.eq('ownerId', user.subject))
			.paginate(paginationOpts);
	},
});

export const removeById = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new ConvexError('Unauthorized');
		}

		const document = await ctx.db.get(args.id);
		if (!document) {
			throw new ConvexError('Document not found');
		}

		const idOwner = document.ownerId === user.subject;
		const organizationRole = (user.organization_role ?? undefined) as string | undefined;

		if (!idOwner && organizationRole !== 'org:admin') {
			throw new ConvexError('Unauthorized');
		}

		return await ctx.db.delete(args.id);
	},
});

export const updateById = mutation({
	args: { id: v.id('documents'), title: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new ConvexError('Unauthorized');
		}

		const document = await ctx.db.get(args.id);
		if (!document) {
			throw new ConvexError('Document not found');
		}

		const idOwner = document.ownerId === user.subject;
		const organizationRole = (user.organization_role ?? undefined) as string | undefined;

		if (!idOwner && organizationRole !== 'org:admin') {
			throw new ConvexError('Unauthorized');
		}

		return await ctx.db.patch(args.id, { title: args.title });
	},
});

export const getById = query({
	args: { id: v.id('documents') },
	handler: async (ctx, { id }) => {
		const document = await ctx.db.get(id);

		return document;
	},
});

export const getByIds = query({
	args: { ids: v.array(v.id('documents')) },
	handler: async (ctx, { ids }) => {
		const documents = [];

		for (const id of ids) {
			const document = await ctx.db.get(id);

			if (document) {
				documents.push({ id: document._id, name: document.title });
			} else {
				documents.push({ id, name: '[Deleted]' });
			}
		}

		return documents;
	},
});
