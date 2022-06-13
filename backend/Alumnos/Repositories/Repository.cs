using Alumnos.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Alumnos.DataContext;
using System.Linq.Expressions;


namespace Alumnos.Repositories
{
    public class GenericRepository<TEntity, TContext> : IGenericRepository<TEntity> where TEntity : class where TContext : AppDbContext
    {
        protected AppDbContext _dbContext { get; set; }
        protected DbSet<TEntity> dbSet;
        public GenericRepository(AppDbContext _dbContext)
        {
            _dbContext = _dbContext;
            dbSet = _dbContext.Set<TEntity>();
        }
        public async Task<ICollection<TEntity>> FindAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<ICollection<TEntity>> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await dbSet.Where(expression).ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await this.dbSet.FindAsync(id);
        }

        public async Task CreateAsync(TEntity entity)
        {
            await dbSet.AddAsync(entity);
        }

        public async Task CreateRangeAsync(ICollection<TEntity> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }

        public void RemoveRange(ICollection<TEntity> entities)
        {
            dbSet.RemoveRange(entities);            
        }

        public void Remove(TEntity entity)
        {
            dbSet.Remove(entity);
        }
    }

}
