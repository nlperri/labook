import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.text('id').primary().notNullable().unique()
    table.text('name').notNullable()
    table.text('email').notNullable().unique()
    table.text('password').notNullable()
    table.text('role').notNullable()
    table.text('created_at').notNullable()
  })

  await knex.schema.createTable('posts', (table) => {
    table.text('id').primary().notNullable().unique()
    table.text('creator_id').notNullable().references('id').inTable('users')
    table.text('content').notNullable()
    table.integer('likes')
    table.integer('dislikes')
    table.text('created_at').notNullable()
    table.text('updated_at')
  })

  await knex.schema.createTable('likes_dislikes', (table) => {
    table.text('user_id').notNullable().references('id').inTable('users')
    table.text('post_id').notNullable().references('id').inTable('posts')
    table.integer('like').notNullable()
    table.primary(['user_id', 'post_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('likes_dislikes')
  await knex.schema.dropTableIfExists('posts')
  await knex.schema.dropTableIfExists('users')
}
