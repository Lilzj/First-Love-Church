namespace FirstLoveChurch.API.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> Repository<T>() where T : Models.Common.BaseEntity;
    Task<int> SaveChangesAsync();
}
